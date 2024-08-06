import { FC } from "react";
import CommonIconProps from "@/types/commonIconProps";
import styles from "./CommonIcon.module.scss";

const CommonIcon: FC<CommonIconProps> = ({ id, className, width, height }) => {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={width}
      height={height}
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default CommonIcon;
