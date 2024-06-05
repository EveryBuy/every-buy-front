import CommonIconProps from "@/types/commonIconProps";
import styles from "./CommonIcon.module.scss";

const CommonIcon: React.FC<CommonIconProps> = ({ id, className }) => {
  return (
    <svg className={`${styles.icon} ${className}`}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default CommonIcon;
