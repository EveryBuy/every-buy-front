import { FC } from "react";
import { Box } from "@mui/material";
import styles from "./Button.module.scss";

interface ButtonType {
  text: string;
  onClick: () => void;
  style: React.CSSProperties;
  typeStatus?: boolean;
}

const Button: FC<ButtonType> = ({ text, onClick, style, typeStatus }) => {
  return (
    <Box onClick={onClick} style={style} className={styles.buttonWrapper}>
      {text}
    </Box>
  );
};

export default Button;
