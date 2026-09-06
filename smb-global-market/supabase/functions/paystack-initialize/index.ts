// Supabase Edge Function: paystack-initialize
//
// Called by the client at checkout. Runs with the service role key, so it
// can read the authoritative cart/product prices and write orders — the
// browser never gets to declare the amount to be charged.
//
// Required secrets (set with `supabase secrets set`):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PAYSTACK_SECRET_KEY
//
// Request body: { address_id: string }
// The cart is read server-side from cart_items for the authenticated user;
// nothing about price or quantity is trusted from the request body.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const jwt = authHeader.replace('Bearer ', '');
    if (!jwt) return json({ error: 'Missing auth token' }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Resolve the calling user from their JWT.
    const { data: userData, error: userErr } = await admin.auth.getUser(jwt);
    if (userErr || !userData?.user) return json({ error: 'Invalid session' }, 401);

    const { data: profile } = await admin
      .from('profiles')
      .select('id, email, full_name')
      .eq('user_id', userData.user.id)
      .single();
    if (!profile) return json({ error: 'Profile not found' }, 404);

    const { address_id } = await req.json();
    if (!address_id) return json({ error: 'address_id is required' }, 400);

    // Load the real cart with authoritative product prices/stock.
    const { data: cartItems, error: cartErr } = await admin
      .from('cart_items')
      .select('quantity, products(id, name, price, vendor_id, status, inventory(quantity))')
      .eq('profile_id', profile.id);

    if (cartErr) return json({ error: 'Failed to load cart' }, 500);
    if (!cartItems || cartItems.length === 0) return json({ error: 'Cart is empty' }, 400);

    for (const item of cartItems) {
      const p = item.products;
      if (!p || p.status !== 'published') return json({ error: `Product unavailable: ${p?.name ?? item.product_id}` }, 400);
      const stock = p.inventory?.quantity ?? 0;
      if (item.quantity > stock) return json({ error: `Insufficient stock for ${p.name}` }, 400);
    }

    const { data: settings } = await admin.from('platform_settings').select('*').single();
    const commissionRate = Number(settings?.commission_rate ?? 0.1);
    const deliveryFee = Number(settings?.default_delivery_fee ?? 0);

    // Group by vendor: one order row per vendor per the schema design.
    const byVendor = new Map<string, typeof cartItems>();
    for (const item of cartItems) {
      const vId = item.products.vendor_id;
      if (!byVendor.has(vId)) byVendor.set(vId, []);
      byVendor.get(vId)!.push(item);
    }

    const checkoutGroupId = crypto.randomUUID();
    let grandTotal = 0;
    const createdOrderIds: string[] = [];

    for (const [vendorId, items] of byVendor) {
      const subtotal = items.reduce((sum, i) => sum + Number(i.products.price) * i.quantity, 0);
      const commission = Number((subtotal * commissionRate).toFixed(2));
      const total = Number((subtotal + deliveryFee).toFixed(2));
      grandTotal += total;

      const { data: order, error: orderErr } = await admin
        .from('orders')
        .insert({
          checkout_group_id: checkoutGroupId,
          customer_id: profile.id,
          vendor_id: vendorId,
          address_id,
          subtotal,
          delivery_fee: deliveryFee,
          platform_commission: commission,
          total_amount: total,
          order_status: 'pending',
          payment_status: 'pending'
        })
        .select('id')
        .single();
      if (orderErr || !order) return json({ error: 'Failed to create order' }, 500);
      createdOrderIds.push(order.id);

      const orderItemsPayload = items.map((i) => ({
        order_id: order.id,
        product_id: i.products.id,
        product_name_snapshot: i.products.name,
        unit_price: i.products.price,
        quantity: i.quantity,
        line_total: Number((Number(i.products.price) * i.quantity).toFixed(2))
      }));
      await admin.from('order_items').insert(orderItemsPayload);
    }

    // Initialize a single Paystack transaction for the whole checkout group.
    const amountKobo = Math.round(grandTotal * 100);
    const psRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: profile.email,
        amount: amountKobo,
        metadata: { checkout_group_id: checkoutGroupId, order_ids: createdOrderIds }
      })
    });
    const psData = await psRes.json();
    if (!psRes.ok || !psData.status) {
      return json({ error: 'Paystack initialization failed', detail: psData }, 502);
    }

    await admin.from('payments').insert({
      checkout_group_id: checkoutGroupId,
      customer_id: profile.id,
      provider: 'paystack',
      provider_reference: psData.data.reference,
      amount: grandTotal,
      status: 'pending',
      raw_response: psData
    });

    return json({
      authorization_url: psData.data.authorization_url,
      reference: psData.data.reference,
      checkout_group_id: checkoutGroupId
    });
  } catch (e) {
    return json({ error: 'Unexpected server error', detail: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
