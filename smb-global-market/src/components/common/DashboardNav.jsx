import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { signOut } from '../../services/authService';

export default function DashboardNav({ links }) {
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  return (
    <nav className="border-b border-gray-100 bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex gap-4">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap py-3 text-sm border-b-2 ${isActive ? 'border-brand-green text-brand-green font-medium' : 'border-transparent text-gray-500'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-1 text-sm text-red-600 py-3">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </nav>
  );
}
