"use client";

import CommonButton from "@/components/ui/CommonButton/CommonButton";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ErrorModal.module.scss";

const ServerErrorModal: React.FC = () => {
    const router = useRouter();

    const handleClose = () => router.push("/login");

    return (
        <CommonModal onClose={handleClose}>
            <h3 className={styles.errorModalTitle}>Користувач з таким телефоном/імейлом вже зареєстрований!</h3>
            <CommonButton
                type="button"
                title="Вхід"
                color="yellow"
                onClick={handleClose}
                className={styles.primaryButton}
            />
        </CommonModal>
    )
};

export default ServerErrorModal;
