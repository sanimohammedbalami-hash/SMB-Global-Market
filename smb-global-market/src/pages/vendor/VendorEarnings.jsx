import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getVendorByProfileId } from '../../services/vendorService';
import { supabase } from '../../lib/supabaseClient';

export default function VendorEarnings() {
  const { profile } = useAuth();
  const [earnings, setEarnings] = useState([]);
  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      const v = await getVendorByProfileId(profile.id);
      if (!v) return;
      const { data: e } = await supabase.from('vendor_earnings').select('*').eq('vendor_id', v.id).order('created_at', { ascending: false });
      const { data: s } = await supabase.from('vendor_settlements').select('*').eq('vendor_id', v.id).order('created_at', { ascending: false });
      setEarnings(e || []);
      setSettlements(s || []);
    })();
  }, [profile]);

  const totals = earnings.reduce(
    (acc, e) => ({
      gross: acc.gross + Number(e.gross_amount),
      commission: acc.commission + Number(e.platform_commission),
      net: acc.net + Number(e.net_earning),
      available: acc.available + (e.settlement_status === 'available' ? Number(e.net_earning) : 0),
      pending: acc.pending + (e.settlement_status === 'pending' ? Number(e.net_earning) : 0)
    }),
    { gross: 0, commission: 0, net: 0, available: 0, pending: 0 }
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Earnings</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          ['Total sales', totals.gross],
          ['Commission', totals.commission],
          ['Net earnings', totals.net],
          ['Available', totals.available],
          ['Pending', totals.pending]
        ].map(([label, val]) => (
          <div key={label} className="card p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-semibold">₦{val.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <h2 className="font-medium mb-2">Settlement history</h2>
      {settlements.length === 0 ? (
        <p className="text-gray-400 text-sm">No settlements have been processed yet.</p>
      ) : (
        <div className="space-y-2">
          {settlements.map((s) => (
            <div key={s.id} className="card p-3 flex justify-between text-sm">
              <span>{s.settlement_reference || s.id.slice(0, 8)}</span>
              <span>₦{Number(s.amount).toLocaleString()}</span>
              <span className="uppercase text-xs text-gray-500">{s.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
