// src/components/common/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Bell, LogOut, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useEffect, useState } from 'react';
import { signOut } from '../../services/authService';
import { getMyNotifications, getUnreadNotificationCount, markAllNotificationsRead } from '../../services/notificationService';

function timeOfDayGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function Header() {
  const { isAuthenticated, profile } = useAuth();
  const { items } = useCart();
  const [q, setQ] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    (async () => {
      try {
        const [list, count] = await Promise.all([
          getMyNotifications(10),
          getUnreadNotificationCount(),
        ]);
        setNotifications(list);
        setUnreadCount(count);
      } catch {
        // Table/columns may not match yet — fail quietly, keep the UI usable.
        setNotifications([]);
        setUnreadCount(0);
      }
    })();
  }, [isAuthenticated]);

  async function openNotifications() {
    setNotifOpen((o) => !o);
    if (!notifOpen && unreadCount > 0) {
      try {
        await markAllNotificationsRead();
        setUnreadCount(0);
      } catch {
        // ignore — badge will just stay until schema is confirmed
      }
    }
  }

  function onSearch(e) {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
    navigate('/');
  }

  const location = [profile?.city, profile?.state].filter(Boolean).join(', ') || 'Set your location';
  const firstName = profile?.full_name?.split(' ')[0];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-brand-green whitespace-nowrap">
          SMB <span className="text-gray-700">Global Market</span>
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

          {isAuthenticated && (
            <div className="relative">
              <button onClick={openNotifications} className="relative">
                <Bell className="w-5 h-5 text-gray-800" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 max-h-80 overflow-y-auto">
                  <p className="px-4 py-2 text-sm font-semibold text-gray-800 border-b border-gray-100">Notifications</p>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-gray-400 text-center">No notifications yet.</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="px-4 py-2 text-sm text-gray-700 border-b border-gray-50 last:border-0">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-800" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1 text-sm text-gray-800">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{firstName || 'Account'}</span>
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

      {/* Mobile search */}
      <form onSubmit={onSearch} className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Search products, categories..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </form>

      {/* Delivery / greeting bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <Link to="/addresses" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 min-w-0">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              <span className="text-gray-400">Deliver to </span>
              <span className="font-medium">{location}</span>
            </span>
          </Link>
          {isAuthenticated && firstName && (
            <span className="text-gray-600 whitespace-nowrap ml-3">
              {timeOfDayGreeting()}, <span className="font-medium text-gray-800">{firstName}</span> 👋
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
