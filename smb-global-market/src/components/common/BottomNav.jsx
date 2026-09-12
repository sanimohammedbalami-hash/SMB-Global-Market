import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

export default function BottomNav() {
  const { pathname } = useLocation();
  const { items } = useCart();

  const tabs = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/categories', icon: Grid, label: 'Categories' },
    { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: items.length },
    { to: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-40 md:hidden">
      {tabs.map(({ to, icon: Icon, label, badge }) => {
        const active = pathname === to;
        return (
          <Link key={to} to={to} className="flex flex-col items-center gap-0.5 px-3 relative">
            <Icon className={`w-5 h-5 ${active ? 'text-brand-green' : 'text-gray-400'}`} />
            {badge > 0 && (
              <span className="absolute -top-1 right-1 bg-brand-green text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {badge}
              </span>
            )}
            <span className={`text-[11px] ${active ? 'text-brand-green font-medium' : 'text-gray-400'}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
            }
