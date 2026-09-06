import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCustomerOrders } from '../../services/orderService';

const FILTERS = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function Orders() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile) return;
    getCustomerOrders(profile.id).then(setOrders).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [profile]);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.order_status === filter);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Your Orders</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-sm border ${filter === f ? 'bg-brand-green text-white border-brand-green' : 'border-gray-300'}`}>
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-400 text-sm">Loading orders...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && filtered.length === 0 && <p className="text-gray-400 text-sm">No orders here yet.</p>}

      <div className="space-y-3">
        {filtered.map((o) => (
          <Link key={o.id} to={`/orders/${o.id}`} className="card p-4 flex justify-between items-center block">
            <div>
              <p className="font-medium">Order #{o.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-500">{o.vendor?.business_name} · {new Date(o.created_at).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₦{Number(o.total_amount).toLocaleString()}</p>
              <p className="text-xs uppercase text-gray-500">{o.order_status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
