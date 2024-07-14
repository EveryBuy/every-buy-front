"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => void;
  register: (phone: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (emailOrPhone: string, password: string) => {
    // Реальна логіка логіну користувача має бути тут
    // Наприклад, виклик API для логіну користувача
    console.log('Логін користувача:', { emailOrPhone, password });
    setIsAuthenticated(true);
  };

  const register = (phone: string, email: string, password: string) => {
    // Реальна логіка реєстрації користувача має бути тут
    // Наприклад, виклик API для реєстрації користувача
    console.log('Реєстрація користувача:', { phone, email, password });
    setIsAuthenticated(true);
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
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
