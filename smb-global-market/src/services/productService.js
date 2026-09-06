import { supabase } from '../lib/supabaseClient';

const PRODUCT_SELECT = `
  id, name, slug, description, price, compare_at_price, currency, status, created_at,
  vendor:vendors(id, business_name, slug, logo_url, status),
  category:categories(id, name, slug),
  product_images(id, url, sort_order),
  inventory(quantity)
`;

export async function getFeaturedProducts(limit = 12) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase.from('products').select(PRODUCT_SELECT).eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function getProductsByCategory(categoryId, { sort = 'newest', minPrice, maxPrice, inStockOnly } = {}) {
  let query = supabase.from('products').select(PRODUCT_SELECT).eq('status', 'published').eq('category_id', categoryId);

  if (minPrice != null) query = query.gte('price', minPrice);
  if (maxPrice != null) query = query.lte('price', maxPrice);

  if (sort === 'price_asc') query = query.order('price', { ascending: true });
  else if (sort === 'price_desc') query = query.order('price', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;

  if (inStockOnly) return data.filter((p) => (p.inventory?.quantity ?? 0) > 0);
  return data;
}

export async function searchProducts(term) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('status', 'published')
    .ilike('name', `%${term}%`);
  if (error) throw error;
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) throw error;
  return data;
}

// ---- Vendor-side product management ----

export async function getVendorProducts(vendorId) {
  const { data, error } = await supabase.from('products').select(PRODUCT_SELECT).eq('vendor_id', vendorId);
  if (error) throw error;
  return data;
}

export async function createProduct(vendorId, payload) {
  const { stock, ...productFields } = payload;
  const { data, error } = await supabase
    .from('products')
    .insert({ vendor_id: vendorId, ...productFields })
    .select()
    .single();
  if (error) throw error;
  await supabase.from('inventory').insert({ product_id: data.id, quantity: stock ?? 0 });
  return data;
}

export async function updateProduct(productId, payload) {
  const { data, error } = await supabase.from('products').update(payload).eq('id', productId).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(productId) {
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) throw error;
}
