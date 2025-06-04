
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  login: async (email: string, password: string) => {
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
  },

  signUp: async (email: string, password: string, metadata: any) => {
    try {
      console.log('Signup metadata:', metadata);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, message: error.message };
      }

      // After successful signup, the trigger function will automatically create the profile
      if (data.user) {
        console.log('User created successfully:', data.user.id, 'with type:', metadata.user_type);
      }

      return { 
        success: true, 
        message: 'Registration successful. Please check your email for verification.' 
      };
    } catch (error: any) {
      console.error('Signup exception:', error);
      return { success: false, message: error.message || 'Failed to sign up' };
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
  }
};
