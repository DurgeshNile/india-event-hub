
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
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, message: error.message };
      }

      // After successful signup, create a profile with the user_type
      if (data.user) {
        console.log('Creating profile for user:', data.user.id, 'with type:', metadata.user_type);
        
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
        } else {
          console.log('Profile created successfully with user_type:', metadata.user_type);
        }
      }

      return { 
        success: true, 
        message: 'Registration successful' 
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
