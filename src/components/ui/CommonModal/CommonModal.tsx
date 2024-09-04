import styles from "./CommonModal.module.scss";
import Image from "next/image";
import xClose from "@/assets/Svg/xClose.svg";

export const CommonModal = ({ onClose, children }: { children: React.FC }) =>
  //   { text, submitOk }: { text: string, submitOk: () => void }
{
  
    return (
      <div className={styles.box}>
        <button className={styles.closeButton}
          type="button"
        onClick={()=>onClose(false)}>
          <Image src={xClose} alt="close" width={18} height={18} />
        </button>
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    );
  };

export default CommonModal;
