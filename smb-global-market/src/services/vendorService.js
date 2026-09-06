import { supabase } from '../lib/supabaseClient';

export async function registerVendor(profileId, payload) {
  const { data, error } = await supabase
    .from('vendors')
    .insert({ profile_id: profileId, ...payload, status: 'pending' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getVendorByProfileId(profileId) {
  const { data, error } = await supabase.from('vendors').select('*').eq('profile_id', profileId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getVendorStats(vendorId) {
  const [{ count: totalProducts }, { count: activeProducts }, { data: orders }, { data: earnings }] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('vendor_id', vendorId),
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('vendor_id', vendorId).eq('status', 'published'),
    supabase.from('orders').select('id, order_status, total_amount').eq('vendor_id', vendorId),
    supabase.from('vendor_earnings').select('net_earning, settlement_status').eq('vendor_id', vendorId)
  ]);

  const totalOrders = orders?.length ?? 0;
  const pendingOrders = orders?.filter((o) => o.order_status === 'pending').length ?? 0;
  const totalSales = orders?.reduce((s, o) => s + Number(o.total_amount), 0) ?? 0;
  const availableEarnings = earnings?.filter((e) => e.settlement_status === 'available').reduce((s, e) => s + Number(e.net_earning), 0) ?? 0;
  const pendingSettlements = earnings?.filter((e) => e.settlement_status === 'pending').reduce((s, e) => s + Number(e.net_earning), 0) ?? 0;

  return { totalProducts, activeProducts, totalOrders, pendingOrders, totalSales, availableEarnings, pendingSettlements };
}

export async function getApprovedVendors(limit = 8) {
  const { data, error } = await supabase.from('vendors').select('*').eq('status', 'approved').limit(limit);
  if (error) throw error;
  return data;
}
