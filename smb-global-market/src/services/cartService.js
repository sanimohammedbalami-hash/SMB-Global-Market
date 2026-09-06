import { supabase } from '../lib/supabaseClient';

export async function getCart(profileId) {
  const { data, error } = await supabase
    .from('cart_items')
    .select('id, quantity, product:products(id, name, price, currency, product_images(url, sort_order), inventory(quantity), vendor:vendors(id, business_name))')
    .eq('profile_id', profileId);
  if (error) throw error;
  return data;
}

export async function addToCart(profileId, productId, quantity = 1) {
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('profile_id', profileId)
    .eq('product_id', productId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('cart_items').insert({ profile_id: profileId, product_id: productId, quantity });
    if (error) throw error;
  }
}

export async function updateCartQuantity(cartItemId, quantity) {
  if (quantity <= 0) return removeFromCart(cartItemId);
  const { error } = await supabase.from('cart_items').update({ quantity }).eq('id', cartItemId);
  if (error) throw error;
}

export async function removeFromCart(cartItemId) {
  const { error } = await supabase.from('cart_items').delete().eq('id', cartItemId);
  if (error) throw error;
}

// NOTE: subtotal/delivery/total shown here are for display only. The
// authoritative amount charged is always recalculated server-side in the
// paystack-initialize Edge Function — the browser's numbers are never
// trusted for payment.
export function computeDisplayTotals(cartItems, deliveryFee = 0) {
  const subtotal = cartItems.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
