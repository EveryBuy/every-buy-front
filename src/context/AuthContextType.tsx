// "use client";

// import React, { createContext, useContext, useState, ReactNode } from "react";
// import getTokenLogin from "@/api/getTokenLogin";
// import getUserData from "@/api/getUserData";
// import getTokenRegistration from "@/api/getTokenRegistration";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (emailOrPhone: string, password: string) => void;
//   register: (phone: string, email: string, password: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = (emailOrPhone: string, password: string) => {
//     const authBody = {
//       login: emailOrPhone,
//       password: password,
//     };
//     setIsAuthenticated(true);
//     getTokenLogin(authBody);
//     return getUserData(authBody);
//   };

//   const register = (email: string, phone: string, password: string) => {
//     setIsAuthenticated(true);
//     return getTokenRegistration(email, phone, password);
//   };

//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectIsLoggedIn, selectRehydrated } from "@/redux/auth/selectorsAuth";
import { login, register, logout } from "@/redux/auth/operations"; // Твої Redux операції

interface AuthContextType {
  isAuthenticated: boolean;
  isRehydrated: boolean;
  login: (emailOrPhone: string, password: string) => Promise<any>;
  register: (phone: string, email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsLoggedIn);
  const isRehydrated = useAppSelector(selectRehydrated);

  const handleLogin = async (emailOrPhone: string, password: string) => {
    return dispatch(login({ login: emailOrPhone, password })).unwrap();
  };

  const handleRegister = async (email: string, phone: string, password: string) => {
    return dispatch(register({ email, phone, password })).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isRehydrated, 
        login: handleLogin, 
        register: handleRegister, 
        logout: handleLogout 
      }}
    >
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
