import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    supabase.from('platform_settings').select('*').eq('id', 1).single().then(({ data }) => setSettings(data));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setMessage(null);
    // Only a profile with role='admin' can write here — enforced by the
    // platform_settings_admin_write RLS policy, not just this page.
    const { error } = await supabase
      .from('platform_settings')
      .update({
        marketplace_name: settings.marketplace_name,
        commission_rate: settings.commission_rate,
        default_delivery_fee: settings.default_delivery_fee,
        default_currency: settings.default_currency
      })
      .eq('id', 1);
    setMessage(error ? error.message : 'Settings saved.');
  }

  if (!settings) return <div className="p-8 text-gray-400">Loading settings...</div>;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Marketplace Settings</h1>
      <form onSubmit={handleSave} className="space-y-3">
        <label className="text-sm text-gray-600">Marketplace name</label>
        <input className="input" value={settings.marketplace_name} onChange={(e) => setSettings({ ...settings, marketplace_name: e.target.value })} />

        <label className="text-sm text-gray-600">Commission rate (0.10 = 10%)</label>
        <input className="input" type="number" step="0.01" min="0" max="1" value={settings.commission_rate} onChange={(e) => setSettings({ ...settings, commission_rate: e.target.value })} />

        <label className="text-sm text-gray-600">Default delivery fee (₦)</label>
        <input className="input" type="number" value={settings.default_delivery_fee} onChange={(e) => setSettings({ ...settings, default_delivery_fee: e.target.value })} />

        <label className="text-sm text-gray-600">Default currency</label>
        <input className="input" value={settings.default_currency} onChange={(e) => setSettings({ ...settings, default_currency: e.target.value })} />

        {message && <p className="text-sm text-gray-600">{message}</p>}
        <button className="btn-primary w-full">Save settings</button>
      </form>
      <p className="text-xs text-gray-400 mt-4">Paystack keys and other secrets are never editable here — they live only in server-side environment variables.</p>
    </div>
  );
}
