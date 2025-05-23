import React, { createContext, useContext, useState } from 'react';
import { AuthState, User } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = async (username: string, password: string) => {
    // In a real application, you would make an API call here
    // For demo purposes, we'll just simulate a successful login
    const user: User = {
      username,
      progress: 0,
    };
    setAuth({ isAuthenticated: true, user });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 