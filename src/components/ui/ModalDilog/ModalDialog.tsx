import CommonButton from "../CommonButton/CommonButton";
import styles from "./ModalDialog.module.scss";
import Image from "next/image";
import xClose from '@/assets/Svg/xClose.svg';

export const ModalDialog = (
  // { children }: { children: React.FC  }
  { text, submitOk }: { text: string, submitOk: () => void }
) => {
  return (
    <div className={styles.box}>
      <button className={styles.closeButton} type="button">
         <Image
          className={styles.xClose}
          src={xClose}
          alt="close"
          width={18}
          height={18}
        />
      </button>

      <h3 className={styles.text}>{text}</h3>

      <div className={styles.buttonWrapper}>
        {/* { children } */}
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="yellow"
        >
          Ні
        </CommonButton>
        <CommonButton
          className={styles.button}
          type="button"
          title=""
          color="transparent"
          onClick={submitOk}
        >
          Так
        </CommonButton>
      </div>
    </div>
  );
};
