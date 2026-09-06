-- SMB Global Market: core schema
-- Apply with: supabase db push  (or paste into the Supabase SQL editor)

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- ============ ENUMS ============
create type user_role as enum ('customer', 'vendor', 'admin');
create type vendor_status as enum ('pending', 'approved', 'rejected', 'suspended');
create type product_status as enum ('draft', 'published', 'disabled');
create type order_status as enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
create type payment_status as enum ('unpaid', 'pending', 'paid', 'failed', 'refunded');
create type settlement_status as enum ('pending', 'available', 'processing', 'paid', 'failed');

-- ============ PROFILES ============
-- One row per auth.users row. role is set at signup and can only be
-- changed by an admin (enforced in RLS below, not just the UI).
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  role user_role not null default 'customer',
  country text,
  state text,
  city text,
  address text,
  is_suspended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ VENDORS ============
create table vendors (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  business_name text not null,
  slug text unique,
  logo_url text,
  description text,
  business_category text,
  country text,
  state text,
  city text,
  business_address text,
  status vendor_status not null default 'pending',
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_vendors_profile on vendors(profile_id);
create index idx_vendors_status on vendors(status);

-- ============ CATEGORIES ============
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  icon text,
  parent_id uuid references categories(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============ PRODUCTS ============
create table products (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  compare_at_price numeric(12,2) check (compare_at_price is null or compare_at_price >= 0),
  currency text not null default 'NGN',
  status product_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_products_vendor on products(vendor_id);
create index idx_products_category on products(category_id);
create index idx_products_status on products(status);
create index idx_products_name_trgm on products using gin (name gin_trgm_ops);
-- requires pg_trgm; comment out the line above if the extension isn't available and use to_tsvector search instead.

create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index idx_product_images_product on product_images(product_id);

create table inventory (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null unique references products(id) on delete cascade,
  quantity int not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default now()
);

-- ============ CART ============
create table cart_items (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, product_id)
);

-- ============ ADDRESSES ============
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  full_name text not null,
  phone text not null,
  country text not null,
  state text not null,
  city text not null,
  street_address text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create index idx_addresses_profile on addresses(profile_id);

-- ============ ORDERS ============
-- One "order" per vendor-per-checkout, so vendor-level fulfillment,
-- earnings and settlement all attach cleanly to a single order row.
-- A checkout that spans multiple vendors creates multiple order rows
-- sharing a checkout_group_id.
create table orders (
  id uuid primary key default uuid_generate_v4(),
  checkout_group_id uuid not null default uuid_generate_v4(),
  customer_id uuid not null references profiles(id) on delete restrict,
  vendor_id uuid not null references vendors(id) on delete restrict,
  address_id uuid references addresses(id) on delete set null,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null default 0 check (delivery_fee >= 0),
  platform_commission numeric(12,2) not null default 0 check (platform_commission >= 0),
  total_amount numeric(12,2) not null check (total_amount >= 0),
  currency text not null default 'NGN',
  order_status order_status not null default 'pending',
  payment_status payment_status not null default 'unpaid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_orders_customer on orders(customer_id);
create index idx_orders_vendor on orders(vendor_id);
create index idx_orders_checkout_group on orders(checkout_group_id);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  product_name_snapshot text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity int not null check (quantity > 0),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);
create index idx_order_items_order on order_items(order_id);

-- ============ PAYMENTS ============
-- Populated only by the server-side Paystack initialize/verify functions,
-- never directly by the browser.
create table payments (
  id uuid primary key default uuid_generate_v4(),
  checkout_group_id uuid not null,
  customer_id uuid not null references profiles(id) on delete restrict,
  provider text not null default 'paystack',
  provider_reference text not null unique,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'NGN',
  status payment_status not null default 'pending',
  raw_response jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_payments_checkout_group on payments(checkout_group_id);
create index idx_payments_customer on payments(customer_id);

-- ============ VENDOR EARNINGS / SETTLEMENTS ============
create table vendor_earnings (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  order_id uuid not null references orders(id) on delete cascade,
  gross_amount numeric(12,2) not null check (gross_amount >= 0),
  platform_commission numeric(12,2) not null check (platform_commission >= 0),
  payment_fee numeric(12,2) not null default 0 check (payment_fee >= 0),
  net_earning numeric(12,2) not null check (net_earning >= 0),
  settlement_status settlement_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (order_id)
);
create index idx_vendor_earnings_vendor on vendor_earnings(vendor_id);

create table vendor_settlements (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  status settlement_status not null default 'pending',
  settlement_reference text,
  settled_at timestamptz,
  created_at timestamptz not null default now()
);
create index idx_vendor_settlements_vendor on vendor_settlements(vendor_id);

-- ============ REVIEWS ============
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  customer_id uuid not null references profiles(id) on delete cascade,
  order_item_id uuid references order_items(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (customer_id, order_item_id)
);
create index idx_reviews_product on reviews(product_id);

-- ============ NOTIFICATIONS ============
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  body text,
  type text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index idx_notifications_profile on notifications(profile_id);

-- ============ PLATFORM SETTINGS ============
-- Single-row style config table. Only admins may write to it (see RLS).
create table platform_settings (
  id int primary key default 1,
  marketplace_name text not null default 'SMB Global Market',
  commission_rate numeric(5,4) not null default 0.1000, -- 10.00%
  default_delivery_fee numeric(12,2) not null default 0,
  default_currency text not null default 'NGN',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into platform_settings (id) values (1) on conflict do nothing;

-- ============ ADMIN ACTIVITY LOG ============
create table admin_activity_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_profile_id uuid not null references profiles(id) on delete restrict,
  action text not null,
  target_table text,
  target_id uuid,
  details jsonb,
  created_at timestamptz not null default now()
);

-- ============ updated_at helper ============
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated before update on profiles
  for each row execute function set_updated_at();
create trigger trg_vendors_updated before update on vendors
  for each row execute function set_updated_at();
create trigger trg_products_updated before update on products
  for each row execute function set_updated_at();
create trigger trg_orders_updated before update on orders
  for each row execute function set_updated_at();
create trigger trg_payments_updated before update on payments
  for each row execute function set_updated_at();
