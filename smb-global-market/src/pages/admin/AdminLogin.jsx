import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getCurrentProfile } from '../../services/authService';

// There is no hardcoded admin password anywhere in this app. An admin is
// simply a profiles row with role='admin' — set that role directly in the
// Supabase dashboard/SQL editor for your first admin user, since the
// profiles_update_own_no_role_change RLS policy prevents self-promotion.
export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn({ email, password });
      const profile = await getCurrentProfile();
      if (profile.role !== 'admin') throw new Error('This account does not have admin access.');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Admin sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn-primary w-full" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}
