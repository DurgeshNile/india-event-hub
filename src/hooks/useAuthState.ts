
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserType } from '@/types/auth';

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userType, setUserType] = useState<UserType | null>(null);

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
        setUserType('user');
        return;
      }

      if (data && 'user_type' in data) {
        setUserType(data.user_type as UserType);
      } else {
        setUserType('user');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUserType('user');
    }
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

  return {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    session,
    setSession,
    loading,
    setLoading,
    userType,
    setUserType,
    fetchUserProfile
  };
};
