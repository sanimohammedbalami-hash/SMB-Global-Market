# SMB Global Market

A real, multi-vendor marketplace foundation: customers browse and buy from
independent vendors, vendors manage their own storefronts, and admins
approve vendors and oversee the platform. Built to be extended by a real
team, not a demo.

## Architecture

- **Frontend:** React + Vite, React Router, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Row Level Security, Edge Functions)
- **Payments:** Paystack, initialized and verified server-side only
- **Deployment:** Vercel (frontend) + Supabase (backend)

Security model: **the database is the source of truth for access control**,
not the UI. Every table has RLS policies (see `supabase/migrations/0002_rls.sql`)
so that even if a frontend check were bypassed, Postgres itself refuses
unauthorized reads/writes. Pricing is never trusted from the browser —
`supabase/functions/paystack-initialize` recalculates the cart total from
live `products`/`inventory` rows before ever talking to Paystack, and
`supabase/functions/paystack-webhook` re-verifies the transaction with
Paystack directly (not just the webhook payload) before marking anything paid.

## Folder structure

```
src/
  components/{common,customer,vendor,admin}
  pages/{customer,vendor,admin}
  services/        -- all Supabase/API calls live here, not in components
  contexts/        -- AuthContext, CartContext
  lib/supabaseClient.js
supabase/
  migrations/      -- schema, RLS, storage policies, SQL functions
  functions/       -- Paystack Edge Functions (Deno)
```

## Database setup

1. Create a project at https://supabase.com.
2. In the SQL editor (or via `supabase db push` with the CLI), run the
   migrations in order:
   - `supabase/migrations/0001_schema.sql`
   - `supabase/migrations/0002_rls.sql`
   - `supabase/migrations/0003_storage.sql`
   - `supabase/migrations/0004_functions.sql`
3. Create your first admin: sign up normally through the app (which creates
   a `customer` profile), then in the SQL editor run:
   ```sql
   update profiles set role = 'admin' where email = 'you@example.com';
   ```
   This has to be done directly in the database — the app intentionally
   has no way for a user to grant themselves admin.

## Environment variables

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Both are in Supabase → Project Settings → API. These are public/anon values
and are safe in frontend code — the anon key only works within the bounds
of your RLS policies.

**Never** put `PAYSTACK_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in a
frontend `.env`. Set them as server-side secrets for the Edge Functions:

```bash
supabase secrets set PAYSTACK_SECRET_KEY=sk_live_or_test_xxx
```

`SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_URL` are injected automatically
into Edge Functions by Supabase.

## Paystack setup

1. Get your keys from the Paystack dashboard.
2. Deploy the Edge Functions:
   ```bash
   supabase functions deploy paystack-initialize
   supabase functions deploy paystack-webhook
   ```
3. In the Paystack dashboard, set your webhook URL to:
   `https://<your-project-ref>.functions.supabase.co/paystack-webhook`

Until these are deployed and configured, checkout will fail at the
"Pay with Paystack" step with a clear error — it will not fake a
successful payment.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

Covers cart total calculations as a starting point; add tests alongside
order/commission logic as it's built out.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Vercel environment
   variables.
4. Vercel will run `npm install && npm run build`; `vercel.json` handles
   SPA routing so client-side routes don't 404 on refresh.

## What's implemented vs. what's next

**Implemented:** schema + RLS for every table in the spec, auth (customer/
vendor/admin roles), customer browsing/cart/checkout/orders, vendor
registration/approval/dashboard/products/orders/earnings, admin dashboard/
vendor approval/customers/products/orders/payments/settings, Paystack
initialize+webhook with idempotent processing and commission/earnings
recording, storage buckets and policies.

**Deliberately left as an integration point, not faked:** actual settlement
transfers to vendor bank accounts (the schema and status flow are ready;
wiring a payout provider is a business decision, not a technical stub),
email/SMS/push delivery for the notifications that are already being
written to the `notifications` table, and a product image upload UI (the
storage buckets and policies exist; the file-picker component is not yet
built).

## Security considerations

- RLS is enabled on every table; policies are in `0002_rls.sql`.
- Vendors cannot change `payment_status` on their own orders (enforced by
  a database trigger, not just a missing button).
- Users cannot change their own `role` (enforced by an RLS `with check`).
- All money columns are `numeric`, never floating point.
- Secrets never appear in frontend code or in this repo — see `.env.example`.

## Roadmap (see spec section 67)

Coupons, product variants, wishlists, vendor KYC, multi-currency, delivery
partner integration, and advanced reporting are not implemented, but the
schema (UUID keys, decimal money, per-vendor order rows) doesn't block
adding them later.
