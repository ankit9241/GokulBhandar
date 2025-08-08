
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '@/services/auth';

interface NewProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}

const NewProtectedRoute: React.FC<NewProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  allowedRoles = [],
}) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default NewProtectedRoute;
