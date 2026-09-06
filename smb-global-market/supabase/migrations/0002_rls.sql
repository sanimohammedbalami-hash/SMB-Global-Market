-- SMB Global Market: Row Level Security
-- Security is enforced here, at the database, not in the UI.

-- Helper: current user's profile id / role, used throughout.
create or replace function current_profile_id()
returns uuid as $$
  select id from profiles where user_id = auth.uid();
$$ language sql stable security definer;

create or replace function current_role()
returns user_role as $$
  select role from profiles where user_id = auth.uid();
$$ language sql stable security definer;

create or replace function is_admin()
returns boolean as $$
  select current_role() = 'admin';
$$ language sql stable security definer;

create or replace function owns_vendor(v_id uuid)
returns boolean as $$
  select exists (
    select 1 from vendors
    where id = v_id and profile_id = current_profile_id()
  );
$$ language sql stable security definer;

-- ============ PROFILES ============
alter table profiles enable row level security;

create policy "profiles_select_own_or_admin" on profiles
  for select using (user_id = auth.uid() or is_admin());

create policy "profiles_insert_self" on profiles
  for insert with check (user_id = auth.uid());

-- Users may update their own profile but NEVER their own role;
-- only an admin (using the service role from a trusted server context) changes role.
create policy "profiles_update_own_no_role_change" on profiles
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid() and role = (select role from profiles p where p.user_id = auth.uid()));

create policy "profiles_admin_full" on profiles
  for all using (is_admin()) with check (is_admin());

-- ============ VENDORS ============
alter table vendors enable row level security;

create policy "vendors_public_read_approved" on vendors
  for select using (status = 'approved' or profile_id = current_profile_id() or is_admin());

create policy "vendors_owner_insert" on vendors
  for insert with check (profile_id = current_profile_id());

create policy "vendors_owner_update_own_profile_fields" on vendors
  for update using (profile_id = current_profile_id() or is_admin())
  with check (
    -- vendor owners can edit their own listing, but not flip their own approval status
    (profile_id = current_profile_id() and status = (select status from vendors v where v.id = vendors.id))
    or is_admin()
  );

-- ============ CATEGORIES ============
alter table categories enable row level security;
create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_write" on categories for all using (is_admin()) with check (is_admin());

-- ============ PRODUCTS ============
alter table products enable row level security;

create policy "products_public_read_published" on products
  for select using (
    status = 'published'
    or owns_vendor(vendor_id)
    or is_admin()
  );

create policy "products_vendor_write_own" on products
  for insert with check (owns_vendor(vendor_id));

create policy "products_vendor_update_own" on products
  for update using (owns_vendor(vendor_id) or is_admin())
  with check (owns_vendor(vendor_id) or is_admin());

create policy "products_vendor_delete_own" on products
  for delete using (owns_vendor(vendor_id) or is_admin());

-- ============ PRODUCT IMAGES ============
alter table product_images enable row level security;

create policy "product_images_public_read" on product_images
  for select using (
    exists (select 1 from products p where p.id = product_id and (p.status = 'published' or owns_vendor(p.vendor_id) or is_admin()))
  );

create policy "product_images_vendor_write" on product_images
  for all using (
    exists (select 1 from products p where p.id = product_id and (owns_vendor(p.vendor_id) or is_admin()))
  ) with check (
    exists (select 1 from products p where p.id = product_id and (owns_vendor(p.vendor_id) or is_admin()))
  );

-- ============ INVENTORY ============
alter table inventory enable row level security;

create policy "inventory_read" on inventory
  for select using (
    exists (select 1 from products p where p.id = product_id and (p.status = 'published' or owns_vendor(p.vendor_id) or is_admin()))
  );

create policy "inventory_vendor_write" on inventory
  for all using (
    exists (select 1 from products p where p.id = product_id and (owns_vendor(p.vendor_id) or is_admin()))
  ) with check (
    exists (select 1 from products p where p.id = product_id and (owns_vendor(p.vendor_id) or is_admin()))
  );

-- ============ CART ============
alter table cart_items enable row level security;

create policy "cart_owner_only" on cart_items
  for all using (profile_id = current_profile_id())
  with check (profile_id = current_profile_id());

-- ============ ADDRESSES ============
alter table addresses enable row level security;

create policy "addresses_owner_only" on addresses
  for all using (profile_id = current_profile_id() or is_admin())
  with check (profile_id = current_profile_id());

-- ============ ORDERS ============
-- Orders are created only via a server-side (service role) function during
-- checkout, so there is intentionally no customer "insert" policy here.
alter table orders enable row level security;

create policy "orders_customer_read_own" on orders
  for select using (customer_id = current_profile_id());

create policy "orders_vendor_read_own" on orders
  for select using (owns_vendor(vendor_id));

create policy "orders_admin_all" on orders
  for all using (is_admin()) with check (is_admin());

-- Vendors may update only fulfillment-related fields on their own orders.
-- Enforcing "which columns changed" fully requires a trigger; this policy
-- at minimum restricts the rows, and a BEFORE UPDATE trigger (see below)
-- blocks vendors from touching payment_status.
create policy "orders_vendor_update_own" on orders
  for update using (owns_vendor(vendor_id))
  with check (owns_vendor(vendor_id));

create or replace function block_vendor_payment_status_change()
returns trigger as $$
begin
  if current_role() = 'vendor' and new.payment_status is distinct from old.payment_status then
    raise exception 'Vendors cannot modify payment_status';
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_block_vendor_payment_status
  before update on orders
  for each row execute function block_vendor_payment_status_change();

-- ============ ORDER ITEMS ============
alter table order_items enable row level security;

create policy "order_items_read" on order_items
  for select using (
    exists (
      select 1 from orders o
      where o.id = order_id
        and (o.customer_id = current_profile_id() or owns_vendor(o.vendor_id) or is_admin())
    )
  );
-- No client-side insert/update/delete policy: order_items are written only
-- by the trusted server-side checkout function using the service role key.

-- ============ PAYMENTS ============
alter table payments enable row level security;

create policy "payments_customer_read_own" on payments
  for select using (customer_id = current_profile_id());

create policy "payments_admin_read" on payments
  for select using (is_admin());
-- No insert/update policy for anon/authenticated roles: payments are
-- written exclusively by the Paystack initialize/verify Edge Functions
-- using the service role key, which bypasses RLS by design.

-- ============ VENDOR EARNINGS / SETTLEMENTS ============
alter table vendor_earnings enable row level security;

create policy "vendor_earnings_owner_read" on vendor_earnings
  for select using (owns_vendor(vendor_id) or is_admin());

alter table vendor_settlements enable row level security;

create policy "vendor_settlements_owner_read" on vendor_settlements
  for select using (owns_vendor(vendor_id) or is_admin());

create policy "vendor_settlements_admin_write" on vendor_settlements
  for all using (is_admin()) with check (is_admin());

-- ============ REVIEWS ============
alter table reviews enable row level security;

create policy "reviews_public_read" on reviews for select using (true);

create policy "reviews_customer_write_own" on reviews
  for insert with check (customer_id = current_profile_id());

create policy "reviews_customer_update_own" on reviews
  for update using (customer_id = current_profile_id())
  with check (customer_id = current_profile_id());

-- ============ NOTIFICATIONS ============
alter table notifications enable row level security;

create policy "notifications_owner_only" on notifications
  for all using (profile_id = current_profile_id())
  with check (profile_id = current_profile_id());

-- ============ PLATFORM SETTINGS ============
alter table platform_settings enable row level security;

create policy "platform_settings_public_read" on platform_settings
  for select using (true);

create policy "platform_settings_admin_write" on platform_settings
  for update using (is_admin()) with check (is_admin());

-- ============ ADMIN ACTIVITY LOGS ============
alter table admin_activity_logs enable row level security;

create policy "admin_logs_admin_only" on admin_activity_logs
  for all using (is_admin()) with check (is_admin());
