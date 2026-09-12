import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import { signOut } from '../../services/authService';

export default function Header() {
  const { isAuthenticated, profile } = useAuth();
  const { items } = useCart();
  const [q, setQ] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
    navigate('/');
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
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1 text-sm text-brand-navy">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{profile?.full_name?.split(' ')[0] || 'Account'}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Orders
                  </Link>
                  <Link to="/addresses" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Addresses
                  </Link>
                  <button onClick={handleSignOut} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
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
