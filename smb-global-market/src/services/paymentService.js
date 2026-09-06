import { supabase } from '../lib/supabaseClient';

// Calls the paystack-initialize Edge Function. All pricing is recalculated
// server-side there from the real cart/product rows — nothing about the
// amount is sent from the browser.
export async function initializeCheckout(addressId) {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/paystack-initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ address_id: addressId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Checkout failed');
  return data; // { authorization_url, reference, checkout_group_id }
}
