import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getVendorByProfileId } from '../../services/vendorService';
import { getVendorOrders, updateOrderFulfillmentStatus } from '../../services/orderService';

const NEXT_STATUS = {
  pending: 'confirmed',
  confirmed: 'processing',
  processing: 'shipped',
  shipped: 'delivered'
};

export default function VendorOrders() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  async function load() {
    const v = await getVendorByProfileId(profile.id);
    if (!v) return;
    try {
      setOrders(await getVendorOrders(v.id));
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if (profile) load();
  }, [profile]);

  async function advance(order) {
    const next = NEXT_STATUS[order.order_status];
    if (!next) return;
    await updateOrderFulfillmentStatus(order.id, next);
    load();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Orders</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {orders.length === 0 ? (
        <p className="text-gray-400 text-sm">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="card p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Order #{o.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-500">{o.customer?.full_name} · ₦{Number(o.total_amount).toLocaleString()}</p>
                <p className="text-xs uppercase text-gray-400 mt-1">Payment: {o.payment_status} · Status: {o.order_status}</p>
              </div>
              {NEXT_STATUS[o.order_status] && o.payment_status === 'paid' && (
                <button onClick={() => advance(o)} className="btn-primary text-xs">
                  Mark as {NEXT_STATUS[o.order_status]}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
