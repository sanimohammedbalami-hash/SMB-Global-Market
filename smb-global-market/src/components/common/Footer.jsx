import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-3">SMB Global Market</h4>
          <p>Discover quality products from trusted sellers across the marketplace.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Customer Support</h4>
          <ul className="space-y-2">
            <li><Link to="/orders">Track Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Sell With Us</h4>
          <ul className="space-y-2">
            <li><Link to="/become-a-vendor">Become a Vendor</Link></li>
            <li><Link to="/vendor/login">Vendor Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-white/10">
        © {new Date().getFullYear()} SMB Global Market. All rights reserved.
      </div>
    </footer>
  );
}
