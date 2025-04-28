"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CommonModal, CommonButton } from "@/components";
import { useBlockUserMutation } from "@/redux/messages/chatApi";
import styles from "../../../../../ui/ModalDilog/ModalDialog.module.scss";

type BlockUserWindowProps = {
  blockUserWindowHandle: () => void;
  setBlockWindowVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BlockUserWindow = ({
  blockUserWindowHandle,
  setBlockWindowVisible,
}: BlockUserWindowProps) => {
  const [blockUser] = useBlockUserMutation();
  const companionId = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.userData?.userId : null
  );

  const blockUserHandler = async (
    userId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setBlockWindowVisible?.((prev) => !prev);
    try {
      if (userId) {
        const response = await blockUser({ userId: userId }).unwrap();
        console.log("response", response);
        if (response.status === 201) {
          console.log("The user is blocked!");
        }
      }
    } catch (error) {
      setBlockWindowVisible?.((prev) => !prev);
      console.error("Failed to block the user:", error);
    }
  };

  return (
    <CommonModal onClose={blockUserWindowHandle}>
      <h3 className={styles.text}>
        Ви впевнені, що хочете заблокувати користувача?
      </h3>

      <div className={styles.buttonWrapper}>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="yellow"
          onClick={blockUserWindowHandle}
        >
          Ні, не блокувати
        </CommonButton>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="transparent"
          // @ts-ignore
          onClick={(e) => blockUserHandler(companionId as number, e)}
        >
          Так, заблокувати
        </CommonButton>
      </div>
    </CommonModal>
  );
};

export default BlockUserWindow;
