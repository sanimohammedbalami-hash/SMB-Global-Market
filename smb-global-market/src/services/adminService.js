import { supabase } from '../lib/supabaseClient';

export async function getPlatformStats() {
  const [{ count: customers }, { count: vendors }, { count: pendingVendors }, { count: products }, { data: orders }] = await Promise.all([
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'customer'),
    supabase.from('vendors').select('id', { count: 'exact', head: true }),
    supabase.from('vendors').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id, total_amount, platform_commission, payment_status')
  ]);

  const paidOrders = orders?.filter((o) => o.payment_status === 'paid') ?? [];
  const totalRevenue = paidOrders.reduce((s, o) => s + Number(o.total_amount), 0);
  const platformCommission = paidOrders.reduce((s, o) => s + Number(o.platform_commission), 0);

  return { customers, vendors, pendingVendors, products, totalOrders: orders?.length ?? 0, totalRevenue, platformCommission };
}

export async function getPendingVendors() {
  const { data, error } = await supabase.from('vendors').select('*, profile:profiles(email, phone)').eq('status', 'pending');
  if (error) throw error;
  return data;
}

async function logAdminAction(adminProfileId, action, targetTable, targetId, details = {}) {
  await supabase.from('admin_activity_logs').insert({
    admin_profile_id: adminProfileId,
    action,
    target_table: targetTable,
    target_id: targetId,
    details
  });
}

export async function approveVendor(adminProfileId, vendorId) {
  const { error } = await supabase.from('vendors').update({ status: 'approved' }).eq('id', vendorId);
  if (error) throw error;
  await logAdminAction(adminProfileId, 'approve_vendor', 'vendors', vendorId);
}

export async function rejectVendor(adminProfileId, vendorId, reason) {
  const { error } = await supabase.from('vendors').update({ status: 'rejected', rejection_reason: reason }).eq('id', vendorId);
  if (error) throw error;
  await logAdminAction(adminProfileId, 'reject_vendor', 'vendors', vendorId, { reason });
}

export async function suspendVendor(adminProfileId, vendorId) {
  const { error } = await supabase.from('vendors').update({ status: 'suspended' }).eq('id', vendorId);
  if (error) throw error;
  await logAdminAction(adminProfileId, 'suspend_vendor', 'vendors', vendorId);
}
