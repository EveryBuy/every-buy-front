"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { CommonButton, CommonModal } from "@/components";
import styles from "./ErrorModal.module.scss";

const ErrorModal: FC<{
  onClose: () => void;
  title: string;
  buttonText: string;
}> = ({ onClose, title, buttonText }) => {
  const router = useRouter();

  return (
    <CommonModal onClose={onClose}>
      <h3 className={styles.errorModalTitle}>{title}</h3>
      <CommonButton
        type="button"
        title={buttonText}
        color="yellow"
        onClick={onClose}
        className={styles.primaryButton}
      />
    </CommonModal>
  );
};

export default ErrorModal;
