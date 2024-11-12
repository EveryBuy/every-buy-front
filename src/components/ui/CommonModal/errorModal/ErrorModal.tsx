"use client";

import { CommonButton, CommonModal } from "@/components";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ErrorModal.module.scss";

const ErrorModal: React.FC<{ onClose: () => void; title: string; buttonText: string }> = ({ onClose, title, buttonText }) => {
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
    )
};

export default ErrorModal;
