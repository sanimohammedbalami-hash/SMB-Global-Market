import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8) return setError('Password must be at least 8 characters.');
    setSubmitting(true);
    try {
      await signUp({ email: form.email, password: form.password, fullName: form.fullName, role: 'customer' });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" placeholder="Full name" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
        <input className="input" type="email" placeholder="Email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
        <input className="input" type="password" placeholder="Password (min 8 characters)" required value={form.password} onChange={(e) => update('password', e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn-primary w-full" disabled={submitting}>{submitting ? 'Creating account...' : 'Create account'}</button>
      </form>
    </div>
  );
}
