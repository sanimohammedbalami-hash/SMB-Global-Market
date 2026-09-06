import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // raw_response / secret credentials are never selected here — only
    // the fields an admin needs to audit payment activity.
    supabase
      .from('payments')
      .select('id, provider_reference, amount, status, created_at, customer:profiles(full_name, email)')
      .order('created_at', { ascending: false })
      .then(({ data }) => setPayments(data || []));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Payments</h1>
      <div className="space-y-2">
        {payments.map((p) => (
          <div key={p.id} className="card p-3 flex justify-between items-center text-sm">
            <div>
              <p className="font-medium">{p.provider_reference}</p>
              <p className="text-gray-500">{p.customer?.full_name} · {new Date(p.created_at).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₦{Number(p.amount).toLocaleString()}</p>
              <p className="text-xs uppercase text-gray-500">{p.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
