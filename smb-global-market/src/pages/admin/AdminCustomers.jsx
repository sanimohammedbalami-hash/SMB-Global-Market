import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from('profiles').select('*').eq('role', 'customer').order('created_at', { ascending: false });
    setCustomers(data || []);
  }

  async function toggleSuspend(c) {
    await supabase.from('profiles').update({ is_suspended: !c.is_suspended }).eq('id', c.id);
    load();
  }

  const filtered = customers.filter((c) => (c.full_name || '').toLowerCase().includes(q.toLowerCase()) || (c.email || '').includes(q));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <input className="input mb-4 max-w-sm" placeholder="Search customers..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.id} className="card p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{c.full_name || 'Unnamed'}</p>
              <p className="text-sm text-gray-500">{c.email}</p>
            </div>
            <button onClick={() => toggleSuspend(c)} className={`text-xs ${c.is_suspended ? 'text-brand-green' : 'text-red-500'}`}>
              {c.is_suspended ? 'Unsuspend' : 'Suspend'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
