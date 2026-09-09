'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  nickname?: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  registerUser: (data: { name: string; nickname?: string; email: string; phone: string; password?: string }) => UserProfile;
  loginUser: (emailOrPhone: string, password?: string) => LoginResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load active user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('labgold_active_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {}
  }, []);

  const registerUser = (data: { name: string; nickname?: string; email: string; phone: string; password?: string }) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: data.name,
      nickname: data.nickname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    try {
      localStorage.setItem('labgold_active_user', JSON.stringify(newUser));

      // Save to local user registry DB
      const existingUsers: UserProfile[] = JSON.parse(localStorage.getItem('labgold_users_db') || '[]');
      
      // Update existing user or push new
      const existingIdx = existingUsers.findIndex(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (existingIdx >= 0) {
        existingUsers[existingIdx] = newUser;
      } else {
        existingUsers.push(newUser);
      }
      localStorage.setItem('labgold_users_db', JSON.stringify(existingUsers));

      // Call registration API endpoint for email sending & lead persistence
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      }).catch(() => {});
    } catch (e) {}

    return newUser;
  };

  const loginUser = (emailOrPhone: string, passwordInput?: string): LoginResult => {
    try {
      const existingUsers: UserProfile[] = JSON.parse(localStorage.getItem('labgold_users_db') || '[]');
      const cleanSearch = emailOrPhone.trim().toLowerCase();
      
      const found = existingUsers.find(
        u => u.email.toLowerCase() === cleanSearch || u.phone.replace(/\D/g, '').includes(cleanSearch.replace(/\D/g, ''))
      );

      if (!found) {
        return {
          success: false,
          error: 'Conta não encontrada com este e-mail ou WhatsApp. Crie sua conta primeiro!'
        };
      }

      // Check password equality strictly if user has a password registered
      if (found.password && passwordInput && found.password !== passwordInput) {
        return {
          success: false,
          error: 'Senha incorreta! Verifique a senha digitada e tente novamente.'
        };
      }

      setUser(found);
      localStorage.setItem('labgold_active_user', JSON.stringify(found));
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Erro ao efetuar login. Tente novamente.' };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('labgold_active_user');
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        registerUser,
        loginUser,
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
