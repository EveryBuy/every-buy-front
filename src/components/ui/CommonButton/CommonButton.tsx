import { FC } from "react";
import CommonButtonProps from "@/types/commonButtonProps";
import styles from "./CommonButton.module.scss";

const CommonButton: FC<CommonButtonProps> = ({
  type,
  title,
  color,
  className,
  children,
  onClick,
}) => {
  return (
    <button type={type} className={`${styles[color]} ${className}`}
    onClick={onClick}>
      {title}
      {children}
    </button>
  );
};

export default CommonButton;
