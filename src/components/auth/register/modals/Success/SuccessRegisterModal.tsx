"use client";

import CommonButton from "@/components/ui/CommonButton/CommonButton";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./SuccessRegisterModal.module.scss";

const SuccessRegisterModal: React.FC = () => {
  const router = useRouter();

  const handleClose = () => router.push("/");

  return (
    <CommonModal onClose={handleClose}>
      <h3 className={styles.registerModalTitle}>Вітаємо вас!</h3>
      <p className={styles.registerModalText}>Ви успішно зареєструвалися і тепер можете насолоджуватися всіма перевагами нашого сервісу.</p>
      <p className={styles.registerModalText}>Дякуємо за реєстрацію у нашому магазині. Бажаємо вам приємних покупок!</p>
      <CommonButton
        type="button"
        title="Перейти до налаштувань профілю"
        color="yellow"
        className={styles.primaryButton}
        onClick={() => router.push("/user")}
      />
      <CommonButton
        type="button"
        title="Повернутися на головну"
        className={styles.secondaryButton}
        onClick={handleClose}
      />
    </CommonModal>
  )
};

export default SuccessRegisterModal;