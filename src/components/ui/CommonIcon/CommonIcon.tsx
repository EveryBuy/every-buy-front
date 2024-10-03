"use client";
import { FC } from "react";
import CommonIconProps from "@/types/commonIconProps";
import styles from "./CommonIcon.module.scss";

const CommonIcon: FC<CommonIconProps> = ({
  id,
  className,
  width,
  height,
  onClick,
}) => {
  const style = `${styles.icon} ${className ? className : ""}`;
  return (
    <svg
      // className={`${styles.icon} ${className}`}
      className={style}
      width={width}
      height={height}
      onClick={onClick}
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
};

export default CommonIcon;
