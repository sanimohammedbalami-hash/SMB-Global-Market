import { useState } from 'react';
import { requestPasswordReset } from '../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await requestPasswordReset(email);
      setMessage('If an account exists for that email, a reset link has been sent.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary w-full" disabled={submitting}>{submitting ? 'Sending...' : 'Send reset link'}</button>
      </form>
      {message && <p className="text-sm text-gray-600 mt-4">{message}</p>}
    </div>
  );
}
