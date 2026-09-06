import { supabase } from '../lib/supabaseClient';

export async function getCustomerOrders(customerId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, vendor:vendors(business_name), order_items(*)')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, vendor:vendors(business_name, logo_url), order_items(*), address:addresses(*)')
    .eq('id', orderId)
    .single();
  if (error) throw error;
  return data;
}

export async function getVendorOrders(vendorId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), customer:profiles(full_name, phone)')
    .eq('vendor_id', vendorId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// Vendors may only move fulfillment forward; payment_status is blocked at
// the database level by the block_vendor_payment_status_change trigger.
export async function updateOrderFulfillmentStatus(orderId, order_status) {
  const { error } = await supabase.from('orders').update({ order_status }).eq('id', orderId);
  if (error) throw error;
}
