
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'user' | 'contributor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType
}) => {
  const { isAuthenticated, loading, userType, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to auth page, but save the current location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if this route requires a specific user type
  if (requiredUserType === 'admin') {
    if (!isAdmin()) {
      // Redirect non-admin users away from admin routes
      return <Navigate to="/" replace />;
    }
  } else if (requiredUserType && userType !== requiredUserType && !isAdmin()) {
    // Admin can access all routes, otherwise check for specific role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
