import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white mt-8 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2 text-sm">SMB Global Market</h4>
          <p className="text-xs text-white/90">Your trusted hub for quality products and trusted vendors.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-sm">Customer Support</h4>
          <ul className="space-y-1 text-xs text-white/90">
            <li><Link to="/orders">Track Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-sm">Thank you for selling with us</h4>
          <ul className="space-y-1 text-xs text-white/90">
            <li><Link to="/become-a-vendor">Become a Vendor</Link></li>
            <li><Link to="/vendor/login">Vendor Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-sm">About</h4>
          <ul className="space-y-1 text-xs text-white/90">
            <li><Link to="/terms">How We Work</Link></li>
            <li><Link to="/privacy">Your Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-3 border-t border-white/20 text-white/80">
        © {new Date().getFullYear()} SMB Global Market. All rights reserved.
      </div>
    </footer>
  );
}
