import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getPendingVendors, approveVendor, rejectVendor } from '../../services/adminService';

export default function AdminVendors() {
  const { profile } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setVendors(await getPendingVendors());
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleApprove(id) {
    await approveVendor(profile.id, id);
    load();
  }

  async function handleReject(id) {
    const reason = window.prompt('Reason for rejection (optional):') || '';
    await rejectVendor(profile.id, id, reason);
    load();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Pending Vendor Applications</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {vendors.length === 0 ? (
        <p className="text-gray-400 text-sm">No pending applications.</p>
      ) : (
        <div className="space-y-3">
          {vendors.map((v) => (
            <div key={v.id} className="card p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{v.business_name}</p>
                <p className="text-sm text-gray-500">{v.profile?.email} · {v.business_category} · {v.city}, {v.state}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleApprove(v.id)} className="btn-primary text-xs">Approve</button>
                <button onClick={() => handleReject(v.id)} className="text-red-500 text-xs">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
