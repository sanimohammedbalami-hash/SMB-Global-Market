// src/services/productService.additions.js
//
// NOTE: This is not a new file to drop in — it's a reference showing the
// two extra query functions Home.jsx needs. Your existing productService.js
// already has getFeaturedProducts/getCategories (confirmed from your Home.jsx),
// so add these two functions into that SAME file (don't create a second
// file/module) and delete this one afterwards.
//
// Both reuse the same `product_images` / `inventory` / `vendor` relations
// your ProductCard.jsx already expects, so ProductCard renders them with
// zero changes.

import { supabase } from '../lib/supabaseClient';

// Products currently on a discount (compare_at_price > price), for the
// "Flash Deals" rail. Falls back to an empty array (never throws to the UI)
// so Home page degrades gracefully if no deals are configured yet.
export async function getFlashDeals(limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, name, price, compare_at_price, currency, status,
      product_images ( url, sort_order ),
      inventory ( quantity ),
      vendor:vendors ( business_name )
    `)
    .eq('status', 'published')
    .not('compare_at_price', 'is', null)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []).filter((p) => Number(p.compare_at_price) > Number(p.price));
}
