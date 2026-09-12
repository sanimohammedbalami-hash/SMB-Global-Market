import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { getCurrentProfile } from '../../services/authService';
import { registerVendor } from '../../services/vendorService';

export default function VendorRegister() {
  const [form, setForm] = useState({
    fullName: '', businessName: '', email: '', phone: '', country: 'Nigeria', state: '', city: '',
    businessAddress: '', businessCategory: '', description: '', password: ''
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signUp({ email: form.email, password: form.password, fullName: form.fullName, role: 'vendor' });
      const profile = await getCurrentProfile();
      await registerVendor(profile.id, {
        business_name: form.businessName,
        business_category: form.businessCategory,
        country: form.country,
        state: form.state,
        city: form.city,
        business_address: form.businessAddress,
        description: form.description
      });
      navigate('/vendor/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">Register your business</h1>
      <p className="text-sm text-gray-500 mb-6">Your account starts as <strong>pending</strong> until an admin approves it.</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <input className="input col-span-2" placeholder="Your full name" required onChange={(e) => update('fullName', e.target.value)} />
        <input className="input col-span-2" placeholder="Business name" required onChange={(e) => update('businessName', e.target.value)} />
        <input className="input" type="email" placeholder="Email" required onChange={(e) => update('email', e.target.value)} />
        <input className="input" placeholder="Phone" required onChange={(e) => update('phone', e.target.value)} />
        <input className="input" placeholder="State" onChange={(e) => update('state', e.target.value)} />
        <input className="input" placeholder="City" onChange={(e) => update('city', e.target.value)} />
        <input className="input col-span-2" placeholder="Business address" onChange={(e) => update('businessAddress', e.target.value)} />
        <input className="input col-span-2" placeholder="Business category (e.g. Fashion)" onChange={(e) => update('businessCategory', e.target.value)} />
        <textarea className="input col-span-2" placeholder="Description" onChange={(e) => update('description', e.target.value)} />
        <input className="input col-span-2" type="password" placeholder="Password (min 8 characters)" required onChange={(e) => update('password', e.target.value)} />
        {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}
        <button className="btn-primary col-span-2" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit for approval'}</button>
      </form>
    </div>
  );
}
