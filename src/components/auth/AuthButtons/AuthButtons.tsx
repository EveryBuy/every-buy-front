"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./AuthButtons.module.scss";

const RegisterLoginButtons: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleButtonClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={() => handleButtonClick("/login")}
        className={`${styles.button} ${
          currentPath === "/login" ? styles.buttonActive : ""
        }`}
      >
        Вхід
      </button>
      <button
        onClick={() => handleButtonClick("/register")}
        className={`${styles.button} ${
          currentPath === "/register" ? styles.buttonActive : ""
        }`}
      >
        Реєстрація
      </button>
    </div>
  );
};

export default RegisterLoginButtons;
