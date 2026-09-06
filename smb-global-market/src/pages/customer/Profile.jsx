import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function Profile() {
  const { profile, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    country: profile?.country || '',
    state: profile?.state || '',
    city: profile?.city || ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      // role is intentionally excluded — profiles_update_own_no_role_change
      // in the database will reject any attempt to change it from here anyway.
      const { error } = await supabase.from('profiles').update(form).eq('id', profile.id);
      if (error) throw error;
      await refreshProfile();
      setMessage('Profile updated.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!profile) return <div className="p-8 text-gray-400">Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">My Profile</h1>
      <form onSubmit={handleSave} className="space-y-3">
        <input className="input" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        <input className="input" value={profile.email} disabled />
        <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="input" placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
        <input className="input" placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        <input className="input" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        {message && <p className="text-sm text-gray-600">{message}</p>}
        <button className="btn-primary w-full" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </div>
  );
}
