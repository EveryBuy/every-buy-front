import React, { FC } from "react";
import CommonButtonProps from "@/types/commonButtonProps";
import styles from "./CommonButton.module.scss";

const CommonButton: FC<CommonButtonProps> = ({
  type,
  title,
  color,
  className,
  children,
}) => {
  return (
    <button type={type} className={`${styles[color]} ${className}`}>
      {title}
      {children}
    </button>
  );
};

export default CommonButton;
