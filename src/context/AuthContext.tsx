'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
  nickname?: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  registerUser: (data: { name: string; nickname?: string; email: string; phone: string; password?: string }) => Promise<LoginResult>;
  loginUser: (email: string, password?: string) => Promise<LoginResult>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse Supabase User into our UserProfile
  const mapSupabaseUser = (sbUser: User | null): UserProfile | null => {
    if (!sbUser) return null;
    return {
      id: sbUser.id,
      email: sbUser.email || '',
      name: sbUser.user_metadata?.name || 'Usuário',
      nickname: sbUser.user_metadata?.nickname || '',
      phone: sbUser.user_metadata?.phone || '',
      createdAt: sbUser.created_at
    };
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(mapSupabaseUser(session?.user ?? null));
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSupabaseUser(session?.user ?? null));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const registerUser = async (data: { name: string; nickname?: string; email: string; phone: string; password?: string }): Promise<LoginResult> => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || 'senha123456', // Se não tiver senha (não deveria acontecer), bota um padrão
        options: {
          data: {
            name: data.name,
            nickname: data.nickname || '',
            phone: data.phone || ''
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Envia o e-mail pela API do Resend no background
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Erro ao registrar.' };
    }
  };

  const loginUser = async (email: string, password?: string): Promise<LoginResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || '',
      });

      if (error) {
        return { success: false, error: 'E-mail ou senha incorretos.' };
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: 'Erro ao efetuar login.' };
    }
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        registerUser,
        loginUser,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
