import { NavLink } from 'react-router-dom';

export default function DashboardNav({ links }) {
  return (
    <nav className="border-b border-gray-100 bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto px-4 flex gap-4">
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
    </nav>
  );
}
