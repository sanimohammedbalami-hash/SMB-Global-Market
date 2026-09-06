import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';

export default function Header() {
  const { isAuthenticated, profile } = useAuth();
  const { items } = useCart();
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-brand-navy whitespace-nowrap">
          SMB <span className="text-brand-green">Global Market</span>
        </Link>

        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input pl-9"
              placeholder="Search products, vendors, categories..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-4">
          <Link to="/categories" className="hidden sm:inline text-sm text-gray-600 hover:text-brand-green">
            Categories
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-brand-navy" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Bell className="w-5 h-5 text-brand-navy hidden sm:block" />
              <Link to="/profile" className="flex items-center gap-1 text-sm text-brand-navy">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{profile?.full_name?.split(' ')[0] || 'Account'}</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn-primary text-sm">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
