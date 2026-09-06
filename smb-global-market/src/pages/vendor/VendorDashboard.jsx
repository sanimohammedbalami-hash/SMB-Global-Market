import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getVendorByProfileId, getVendorStats } from '../../services/vendorService';

export default function VendorDashboard() {
  const { profile } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      try {
        const v = await getVendorByProfileId(profile.id);
        setVendor(v);
        if (v) setStats(await getVendorStats(v.id));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [profile]);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!vendor) return <div className="p-8 text-gray-400">Loading vendor profile...</div>;
  if (vendor.status !== 'approved') return <div className="p-8 text-amber-600">Your vendor account status is: {vendor.status}.</div>;
  if (!stats) return <div className="p-8 text-gray-400">Loading stats...</div>;

  const cards = [
    ['Total products', stats.totalProducts],
    ['Active products', stats.activeProducts],
    ['Total orders', stats.totalOrders],
    ['Pending orders', stats.pendingOrders],
    ['Total sales', `₦${stats.totalSales.toLocaleString()}`],
    ['Available earnings', `₦${stats.availableEarnings.toLocaleString()}`],
    ['Pending settlements', `₦${stats.pendingSettlements.toLocaleString()}`]
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">{vendor.business_name} — Dashboard</h1>
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
