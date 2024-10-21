import styles from "./CommonModal.module.scss";
import Image from "next/image";
import xClose from "@/assets/Svg/xClose.svg";
import CommonModalProps from "@/types/commonModalProps";
import { Backdrop } from "@mui/material";

export const CommonModal: React.FC<CommonModalProps> = ({
  contentClassName,
  onClose,
  children,
}) => {
  return (
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // @ts-ignore: Ignore type error for the Backdrop component
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClose={onClose}
      onClick={onClose}
    >
      <div className={styles.box} onClick={(evt) => evt.stopPropagation()}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => onClose(false)}
        >
          <Image src={xClose} alt="close" width={18} height={18} />
        </button>
        <div className={`${styles.contentWrapper} ${contentClassName}`}>{children}</div>
      </div>
    </Backdrop>
  );
};

export default CommonModal;
