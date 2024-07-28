"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => void;
  register: (phone: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (emailOrPhone: string, password: string) => {
    const authBody = {
      login: emailOrPhone,
      password: password,
    };

    async function getToken(auth: { login: string; password: string }) {
      try {
        const response = await axios.post(
          "https://api-everybuy.onrender.com/auth/auth",
          auth
        );
        console.log(response.data.data.token);
        return response.data.data.token;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    getToken(authBody);

    async function getData(auth: { login: string; password: string }) {
      try {
        const token = await getToken(auth);
        console.log(token);
        localStorage.setItem("token", token);
        const response = await axios.get(
          "https://api-everybuy.onrender.com/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    setIsAuthenticated(true);
    return getData(authBody);
  };

  const register = (email: string, phone: string, password: string) => {
    async function getData() {
      try {
        const response = await axios.post(
          "https://api-everybuy.onrender.com/auth/registration",
          {
            email: email,
            phone: phone,
            password: password,
          }
        );
        localStorage.setItem("token", response.data.data.token);
        return response.data.data.token;
      } catch (error) {
        console.log(error);
      }
    }
    setIsAuthenticated(true);
    return getData();
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
