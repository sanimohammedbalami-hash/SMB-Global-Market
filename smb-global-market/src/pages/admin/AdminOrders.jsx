import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    supabase
      .from('orders')
      .select('id, total_amount, order_status, payment_status, created_at, vendor:vendors(business_name), customer:profiles(full_name)')
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders(data || []));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.order_status === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <select className="input max-w-xs mb-4" value={filter} onChange={(e) => setFilter(e.target.value)}>
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="space-y-2">
        {filtered.map((o) => (
          <div key={o.id} className="card p-3 flex justify-between items-center text-sm">
            <div>
              <p className="font-medium">#{o.id.slice(0, 8)} — {o.customer?.full_name}</p>
              <p className="text-gray-500">{o.vendor?.business_name} · {new Date(o.created_at).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₦{Number(o.total_amount).toLocaleString()}</p>
              <p className="text-xs uppercase text-gray-500">{o.order_status} / {o.payment_status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
