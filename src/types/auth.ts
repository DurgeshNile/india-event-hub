
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
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

export type UserType = 'user' | 'contributor' | 'admin';
