import { useState } from 'react';
import { signUp } from '../../services/authService';

export default function VendorRegister() {
  const [form, setForm] = useState({
    fullName: '', businessName: '', email: '', phone: '', country: 'Nigeria', state: '', city: '',
    businessAddress: '', businessCategory: '', description: '', password: ''
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // Store the business details in the user's auth metadata so we can
      // finish creating the vendor row after they confirm their email
      // and log in for the first time (see VendorLogin.jsx).
      await signUp({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        role: 'vendor'
      });
      localStorage.setItem('smb_pending_vendor', JSON.stringify({
        business_name: form.businessName,
        business_category: form.businessCategory,
        country: form.country,
        state: form.state,
        city: form.city,
        business_address: form.businessAddress,
        description: form.description
      }));
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-3">Check your email</h1>
        <p className="text-gray-600 text-sm">
          We've sent a confirmation link to <strong>{form.email}</strong>. Confirm your email, then sign in at the vendor login page to finish setting up your business — good to go!
        </p>
      </div>
    );
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
