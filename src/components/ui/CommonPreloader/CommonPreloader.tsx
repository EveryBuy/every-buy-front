import { FC } from "react";
import { CircularProgress, SxProps } from "@mui/material";
import styles from "./CommonPreloader.module.scss";

interface CommonPreloaderProps {
  size?: number;
  color?: string;
  sx?: SxProps;
  className?: string;
}
const CommonPreloader: FC<CommonPreloaderProps> = ({
  size = 40,
  sx,
  className,
}) => {
  return (
    <div className={`${styles.preloaderContainer} ${className}`}>
      <CircularProgress size={size} sx={sx} />
    </div>
  );
};

export default CommonPreloader;
