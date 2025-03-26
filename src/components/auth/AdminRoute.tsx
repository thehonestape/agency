import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingState from '../animation/LoadingState';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  // While checking authentication status, show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not admin, redirect to dashboard
  if (!user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If admin, render the protected route
  return <>{children}</>;
};

export default AdminRoute; 