import { Link, useSearchParams } from 'react-router-dom';

// Reached after the Paystack redirect. The order/payment status shown to
// the user here is informational only — the authoritative "paid" state is
// set by the paystack-webhook Edge Function after server-side verification,
// not by the browser landing on this URL.
export default function OrderSuccess() {
  const [params] = useSearchParams();
  const reference = params.get('reference') || params.get('trxref');

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
      <p className="text-gray-600 mb-1">We're confirming your payment now.</p>
      {reference && <p className="text-xs text-gray-400 mb-6">Reference: {reference}</p>}
      <Link to="/orders" className="btn-primary inline-block">View my orders</Link>
    </div>
  );
}
