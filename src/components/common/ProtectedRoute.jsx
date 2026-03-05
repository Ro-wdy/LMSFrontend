import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from './Spinner';

/**
 * ProtectedRoute - wraps pages that require authentication and optional role checks.
 * @param {string[]} allowedRoles - roles permitted to access the route
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0) {
    const userRoles = user.roles || [];
    const hasAccess =
      user.is_superadmin ||
      (user.is_admin && allowedRoles.includes('admin')) ||
      allowedRoles.some((role) => userRoles.includes(role));

    if (!hasAccess) return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
