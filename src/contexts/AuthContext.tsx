
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  userType: 'user' | 'contributor' | 'admin' | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signUp: (email: string, password: string, metadata: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<'user' | 'contributor' | 'admin' | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is admin
  const isAdmin = () => {
    return user?.email === '1234durgeshnile@gmail.com' || userType === 'admin';
  };

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        
        // Defer profile fetch to avoid potential Supabase client deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id, session.user.email);
          }, 0);
        } else {
          setUserType(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile to get the user type
  const fetchUserProfile = async (userId: string, email?: string) => {
    try {
      // Check if user is the designated admin
      if (email === '1234durgeshnile@gmail.com') {
        setUserType('admin');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        // Default to 'user' if there's an error
        setUserType('user');
        return;
      }

      // If data exists and has user_type property
      if (data && 'user_type' in data) {
        setUserType(data.user_type as 'user' | 'contributor' | 'admin');
      } else {
        // Default to 'user' if user_type is not found
        setUserType('user');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Default to 'user' if there's an exception
      setUserType('user');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { success: false, message: error.message };
      }

      console.log('Login successful for:', email);
      return { success: true, message: 'Login successful' };
    } catch (error: any) {
      console.error('Login exception:', error);
      return { success: false, message: error.message || 'Failed to login' };
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      // After successful signup, create a profile with the user_type
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            first_name: metadata.first_name,
            last_name: metadata.last_name,
            user_type: metadata.user_type,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      return { 
        success: true, 
        message: 'Registration successful' 
      };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to sign up' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
