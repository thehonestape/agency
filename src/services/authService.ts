import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Session, User, Provider, AuthChangeEvent } from '@supabase/supabase-js';

export const authService = {
  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    if (!isSupabaseConfigured()) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
  
  // Get current session
  getSession: async (): Promise<Session | null> => {
    if (!isSupabaseConfigured()) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },
  
  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    return await supabase.auth.signUp({
      email,
      password,
    });
  },
  
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
  
  // Sign in with OAuth provider
  signInWithProvider: async (provider: Provider): Promise<void> => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured, auth features will not work');
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider,
    });
  },
  
  // Sign out
  signOut: async (): Promise<void> => {
    if (!isSupabaseConfigured()) return;
    await supabase.auth.signOut();
  },
  
  // Reset password
  resetPassword: async (email: string) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    return await supabase.auth.resetPasswordForEmail(email);
  },
  
  // Update user
  updateUser: async (attributes: { email?: string; password?: string; data?: object }) => {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase is not configured') };
    }
    return await supabase.auth.updateUser(attributes);
  },
  
  // Set up auth state change listener
  onAuthStateChange: (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured, auth state changes will not be monitored');
      // Return a no-op unsubscribe function
      return { data: { subscription: null }, error: null };
    }
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
}; 