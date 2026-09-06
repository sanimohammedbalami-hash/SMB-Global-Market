import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Frontend route guarding is a UX convenience only. The real enforcement
// is the RLS policies in supabase/migrations/0002_rls.sql — even if this
// component were bypassed, the database would refuse unauthorized reads/writes.
export default function ProtectedRoute({ children, allowedRoles }) {
  const { session, profile, loading } = useAuth();

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
