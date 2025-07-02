"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { CommonButton, CommonModal } from "@/components";
import styles from "./ChatMessageModal.module.scss";

type ChatMessageModalType = {
  doModalOpen: (open: boolean) => void;
  openWindowHandle: () => void;
};

const ChatMessageModal: FC<ChatMessageModalType> = ({
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
        <p className={styles.chatMessageModalTitle}>Чат вже створений.</p>
        <p className={styles.chatMessageModalText}>Спершу авторизуйтесь.</p>
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

export default ChatMessageModal;
