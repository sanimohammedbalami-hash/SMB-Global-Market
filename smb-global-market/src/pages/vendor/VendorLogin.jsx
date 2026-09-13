import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getCurrentProfile } from '../../services/authService';
import { getVendorByProfileId, registerVendor } from '../../services/vendorService';
import { supabase } from '../../lib/supabaseClient';

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [pendingNotice, setPendingNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setPendingNotice(null);
    setSubmitting(true);
    try {
      await signIn({ email, password });
      const profile = await getCurrentProfile();
      if (!profile) throw new Error('Please confirm your email before signing in.');
      if (profile.role !== 'vendor') throw new Error('This account is not registered as a vendor.');

      let vendor = await getVendorByProfileId(profile.id);

      if (!vendor) {
        const { data: pending, error: pendingErr } = await supabase
          .from('pending_vendor_applications')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        if (pendingErr) throw pendingErr;
        if (!pending) throw new Error('No pending vendor application found for this account.');

        vendor = await registerVendor(profile.id, {
          business_name: pending.business_name,
          business_category: pending.business_category,
          country: pending.country,
          state: pending.state,
          city: pending.city,
          business_address: pending.business_address,
          description: pending.description
        });

        await supabase.from('pending_vendor_applications').delete().eq('email', email);
      }

      if (vendor.status === 'pending') return setPendingNotice('Your vendor application is still under review.');
      if (vendor.status === 'rejected') return setPendingNotice('Your vendor application was not approved.' + (vendor.rejection_reason ? ` Reason: ${vendor.rejection_reason}` : ''));
      if (vendor.status === 'suspended') return setPendingNotice('Your vendor account is currently suspended.');
      navigate('/vendor/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Vendor sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {pendingNotice && <p className="text-amber-600 text-sm">{pendingNotice}</p>}
        <button className="btn-primary w-full" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}
