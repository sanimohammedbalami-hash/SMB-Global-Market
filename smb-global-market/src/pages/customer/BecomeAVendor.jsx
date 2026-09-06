import { Link } from 'react-router-dom';

export default function BecomeAVendor() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Sell on SMB Global Market</h1>
      <p className="text-gray-600 mb-8">Reach customers across the marketplace, manage your own storefront, and track your earnings in real time.</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left text-sm">
        <div className="card p-4"><strong>Simple onboarding</strong><p className="text-gray-500 mt-1">Register your business and start listing once approved.</p></div>
        <div className="card p-4"><strong>Transparent earnings</strong><p className="text-gray-500 mt-1">See your commission, fees, and payouts clearly.</p></div>
        <div className="card p-4"><strong>Full dashboard</strong><p className="text-gray-500 mt-1">Manage products, orders, and inventory in one place.</p></div>
      </div>
      <p className="text-xs text-gray-400 mb-4">Requirements: a registered or registerable business name, a valid phone/email, and products that comply with marketplace policy.</p>
      <Link to="/vendor/register" className="btn-primary">Register as a Vendor</Link>
    </div>
  );
}
