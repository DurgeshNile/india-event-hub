
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from '@/types/auth';
import { useAuthState } from '@/hooks/useAuthState';
import { authService } from '@/services/authService';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    session,
    loading,
    userType
  } = useAuthState();

  // Check if user is admin
  const isAdmin = () => {
    return user?.email === '1234durgeshnile@gmail.com' || userType === 'admin';
  };

  const login = async (email: string, password: string) => {
    return authService.login(email, password);
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    return authService.signUp(email, password, metadata);
  };

  const logout = async () => {
    await authService.logout();
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session,
      userType,
      loading,
      login, 
      signUp,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
