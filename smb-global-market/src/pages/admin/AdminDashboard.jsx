import { useEffect, useState } from 'react';
import { getPlatformStats } from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlatformStats().then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!stats) return <div className="p-8 text-gray-400">Loading platform stats...</div>;

  const cards = [
    ['Total customers', stats.customers],
    ['Total vendors', stats.vendors],
    ['Pending vendors', stats.pendingVendors],
    ['Total products', stats.products],
    ['Total orders', stats.totalOrders],
    ['Total revenue', `₦${stats.totalRevenue.toLocaleString()}`],
    ['Platform commission', `₦${stats.platformCommission.toLocaleString()}`]
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(([label, value]) => (
          <div key={label} className="card p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-xl font-semibold mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
