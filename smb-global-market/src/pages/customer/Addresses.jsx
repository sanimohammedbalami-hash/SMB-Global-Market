import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function Addresses() {
  const { profile } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ full_name: '', phone: '', country: 'Nigeria', state: '', city: '', street_address: '' });
  const [error, setError] = useState(null);

  async function load() {
    const { data } = await supabase.from('addresses').select('*').eq('profile_id', profile.id).order('is_default', { ascending: false });
    setAddresses(data || []);
  }

  useEffect(() => {
    if (profile) load();
  }, [profile]);

  async function handleAdd(e) {
    e.preventDefault();
    setError(null);
    try {
      const { error: err } = await supabase.from('addresses').insert({ profile_id: profile.id, ...form });
      if (err) throw err;
      setForm({ full_name: '', phone: '', country: 'Nigeria', state: '', city: '', street_address: '' });
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(id) {
    await supabase.from('addresses').delete().eq('id', id);
    load();
  }

  async function handleSetDefault(id) {
    await supabase.from('addresses').update({ is_default: false }).eq('profile_id', profile.id);
    await supabase.from('addresses').update({ is_default: true }).eq('id', id);
    load();
  }

  if (!profile) return null;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">My Addresses</h1>

      <div className="space-y-2 mb-8">
        {addresses.length === 0 && <p className="text-gray-400 text-sm">No addresses saved yet.</p>}
        {addresses.map((a) => (
          <div key={a.id} className="card p-3 flex justify-between items-center">
            <div className="text-sm">
              <p className="font-medium">{a.full_name} {a.is_default && <span className="text-xs text-brand-green">(default)</span>}</p>
              <p className="text-gray-500">{a.street_address}, {a.city}, {a.state}</p>
            </div>
            <div className="flex gap-2 text-xs">
              {!a.is_default && <button onClick={() => handleSetDefault(a.id)} className="text-brand-green">Set default</button>}
              <button onClick={() => handleDelete(a.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-medium mb-2">Add new address</h2>
      <form onSubmit={handleAdd} className="grid grid-cols-2 gap-2">
        <input className="input col-span-2" placeholder="Full name" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input className="input col-span-2" placeholder="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="input" placeholder="State" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        <input className="input" placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        <input className="input col-span-2" placeholder="Street address" required value={form.street_address} onChange={(e) => setForm({ ...form, street_address: e.target.value })} />
        {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}
        <button className="btn-primary col-span-2">Add address</button>
      </form>
    </div>
  );
}
