import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getVendorByProfileId } from '../../services/vendorService';
import { supabase } from '../../lib/supabaseClient';

export default function VendorProfile() {
  const { profile } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!profile) return;
    getVendorByProfileId(profile.id).then((v) => {
      setVendor(v);
      setForm(v ? { business_name: v.business_name, description: v.description, phone: v.phone, business_address: v.business_address, business_category: v.business_category } : null);
    });
  }, [profile]);

  async function handleSave(e) {
    e.preventDefault();
    setMessage(null);
    try {
      const { error } = await supabase.from('vendors').update(form).eq('id', vendor.id);
      if (error) throw error;
      setMessage('Vendor profile updated.');
    } catch (err) {
      setMessage(err.message);
    }
  }

  if (!form) return <div className="p-8 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Business Profile</h1>
      <form onSubmit={handleSave} className="space-y-3">
        <input className="input" placeholder="Business name" value={form.business_name || ''} onChange={(e) => setForm({ ...form, business_name: e.target.value })} />
        <input className="input" placeholder="Business category" value={form.business_category || ''} onChange={(e) => setForm({ ...form, business_category: e.target.value })} />
        <input className="input" placeholder="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="input" placeholder="Business address" value={form.business_address || ''} onChange={(e) => setForm({ ...form, business_address: e.target.value })} />
        <textarea className="input" placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        {message && <p className="text-sm text-gray-600">{message}</p>}
        <button className="btn-primary w-full">Save changes</button>
      </form>
    </div>
  );
}
