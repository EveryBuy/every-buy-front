"use client";
import { CommonModal, CommonButton } from "@/components";
import styles from "../../../../../ui/ModalDilog/ModalDialog.module.scss";

type DeleteChatWindowProps = {
  deleteChatWindowHandle: () => void;
};

export const DeleteChatWindow = ({
  deleteChatWindowHandle,
}: DeleteChatWindowProps) => {
  return (
    <CommonModal onClose={deleteChatWindowHandle}>
      <h3 className={styles.text}>Ви впевнені, що хочете видалити чат?</h3>

      <div className={styles.buttonWrapper}>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="yellow"
          onClick={deleteChatWindowHandle}
        >
          Ні, не видаляти
        </CommonButton>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="transparent"
          // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          onClick={deleteChatWindowHandle}
        >
          Так, видалити
        </CommonButton>
      </div>
    </CommonModal>
  );
};

export default DeleteChatWindow;
