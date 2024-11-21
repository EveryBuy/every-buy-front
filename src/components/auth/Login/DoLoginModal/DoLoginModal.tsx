"use client";

import { FC } from "react";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import { CommonModal } from "@/components";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./DoLoginModal.module.scss";

type DoLoginModalType = {
  doModalOpen: (open: boolean) => void;
  openWindowHandle: () => void;
};

const DoLoginModal: FC<DoLoginModalType> = ({
  doModalOpen,
  openWindowHandle,
}) => {
  const router = useRouter();
  const handleWindowClose = () => {
    router.push("/login");
    openWindowHandle();
  };

  return (
    <CommonModal onClose={doModalOpen}>
      <div className={styles.windowModalWrapper}>
        <p className={styles.registerModalTitle}>Ви не авторизовані.</p>
        <p className={styles.registerModalText}>Спершу авторизуйтесь.</p>
        <CommonButton
          type="button"
          title="Авторизуватись"
          color="yellow"
          className={styles.primaryButton}
          onClick={handleWindowClose}
        />
      </div>
    </CommonModal>
  );
};

export default DoLoginModal;
