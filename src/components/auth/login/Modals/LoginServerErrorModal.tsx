"use client";

import CommonButton from "@/components/ui/CommonButton/CommonButton";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ErrorModal.module.scss";

const LoginServerErrorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const router = useRouter();

    const handleClose = () => {
      onClose();
      router.refresh();
    }

    return (
        <CommonModal onClose={handleClose}>
            <h3 className={styles.errorModalTitle}>Упс! Проблеми на сервері!</h3>
            <CommonButton
                type="button"
                title="Перезавантажити сторінку"
                color="yellow"
                onClick={handleClose}
                className={styles.primaryButton}
            />
        </CommonModal>
    )
};

export default LoginServerErrorModal;