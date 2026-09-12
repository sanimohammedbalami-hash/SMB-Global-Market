import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import Footer from '../../components/common/Footer';

export default function Login() {
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
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-sm mx-auto px-4 py-16 flex-1 w-full">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="btn-primary w-full" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-brand-green">Forgot password?</Link>
          <Link to="/register" className="text-brand-green">Create account</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
