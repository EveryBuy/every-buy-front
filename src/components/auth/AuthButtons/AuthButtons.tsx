"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from './AuthButtons.module.scss'

const RegisterLoginButtons: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
   <div className={styles.buttonContainer}>
    <button
     className={`handleButton ${currentPath === "/register" ? "handleButton--active" : ""}`}
     onClick={handleRegister}
    >
     Реєстрація
    </button>
    <button
     className={`handleButton ${currentPath === "/login" ? "handleButton--active" : ""}`}
     onClick={handleRegister}
    >
     Вхід
    </button>
    </div>
  );
};

export default RegisterLoginButtons;
