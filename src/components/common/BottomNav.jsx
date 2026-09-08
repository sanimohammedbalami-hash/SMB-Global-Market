import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, Package, User } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/orders', label: 'Orders', icon: Package },
  { to: '/profile', label: 'Account', icon: User }
];

export default function BottomNav() {
  const cart = useContext(CartContext);
  const cartCount = cart?.items?.length || 0;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `relative flex flex-col items-center text-xs gap-1 px-2 ${
              isActive ? 'text-brand-green font-semibold' : 'text-gray-500'
            }`
          }
        >
          <Icon size={22} />
          {label === 'Cart' && cartCount > 0 && (
            <span className="absolute -top-1 right-0 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
