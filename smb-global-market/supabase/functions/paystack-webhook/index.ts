// Supabase Edge Function: paystack-webhook
//
// Configure this URL in the Paystack dashboard as your webhook endpoint.
// Verifies the x-paystack-signature header (HMAC SHA512 of the raw body
// using PAYSTACK_SECRET_KEY) before trusting anything in the payload.
// Idempotent: re-processing the same event/reference is a no-op.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  const rawBody = await req.text();
  const signature = req.headers.get('x-paystack-signature') ?? '';

  const expected = await hmacSha512Hex(PAYSTACK_SECRET_KEY, rawBody);
  if (expected !== signature) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  if (event.event !== 'charge.success') {
    return new Response('ignored', { status: 200 });
  }

  const reference = event.data.reference;

  // Idempotency: only proceed if this payment is still pending.
  const { data: payment } = await admin
    .from('payments')
    .select('*')
    .eq('provider_reference', reference)
    .single();

  if (!payment) return new Response('unknown reference', { status: 404 });
  if (payment.status === 'paid') return new Response('already processed', { status: 200 });

  // Re-verify with Paystack directly rather than trusting the webhook body alone.
  const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
  });
  const verifyData = await verifyRes.json();

  if (!verifyRes.ok || verifyData.data.status !== 'success') {
    await admin.from('payments').update({ status: 'failed', raw_response: verifyData }).eq('id', payment.id);
    return new Response('verification failed', { status: 200 });
  }

  const paidKobo = verifyData.data.amount;
  const expectedKobo = Math.round(Number(payment.amount) * 100);
  if (paidKobo !== expectedKobo) {
    await admin.from('payments').update({ status: 'failed', raw_response: verifyData }).eq('id', payment.id);
    return new Response('amount mismatch', { status: 200 });
  }

  await admin.from('payments').update({ status: 'paid', raw_response: verifyData }).eq('id', payment.id);

  const { data: orders } = await admin
    .from('orders')
    .select('*')
    .eq('checkout_group_id', payment.checkout_group_id);

  for (const order of orders ?? []) {
    await admin
      .from('orders')
      .update({ payment_status: 'paid', order_status: 'confirmed' })
      .eq('id', order.id);

    // Record vendor earnings once (unique constraint on order_id guards re-runs).
    const netEarning = Number(order.subtotal) - Number(order.platform_commission);
    await admin.from('vendor_earnings').upsert(
      {
        vendor_id: order.vendor_id,
        order_id: order.id,
        gross_amount: order.subtotal,
        platform_commission: order.platform_commission,
        payment_fee: 0,
        net_earning: netEarning,
        settlement_status: 'pending'
      },
      { onConflict: 'order_id' }
    );

    // Decrement inventory for each item in this order.
    const { data: items } = await admin.from('order_items').select('product_id, quantity').eq('order_id', order.id);
    for (const item of items ?? []) {
      await admin.rpc('decrement_inventory', { p_product_id: item.product_id, p_qty: item.quantity });
    }

    await admin.from('notifications').insert([
      {
        profile_id: order.customer_id,
        title: 'Payment confirmed',
        body: `Your order ${order.id} has been paid and confirmed.`,
        type: 'order_paid'
      }
    ]);
  }

  return new Response('ok', { status: 200 });
});

async function hmacSha512Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
