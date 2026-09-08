'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  registerUser: (data: { name: string; email: string; phone: string }) => UserProfile;
  loginUser: (emailOrPhone: string) => boolean;
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

  const registerUser = (data: { name: string; email: string; phone: string }) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    try {
      localStorage.setItem('labgold_active_user', JSON.stringify(newUser));

      // Save to local user registry DB
      const existingUsers = JSON.parse(localStorage.getItem('labgold_users_db') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('labgold_users_db', JSON.stringify(existingUsers));
    } catch (e) {}

    return newUser;
  };

  const loginUser = (emailOrPhone: string) => {
    try {
      const existingUsers: UserProfile[] = JSON.parse(localStorage.getItem('labgold_users_db') || '[]');
      const found = existingUsers.find(
        u => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone.includes(emailOrPhone)
      );

      if (found) {
        setUser(found);
        localStorage.setItem('labgold_active_user', JSON.stringify(found));
        return true;
      }
    } catch (e) {}
    return false;
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
