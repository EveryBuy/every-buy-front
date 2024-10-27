import { FC } from "react";
import { Box } from "@mui/material";
import { Companion, Product, Dialogue } from "@/components";
import style from "./DialogueBlock.module.scss";

const DialogueBlock: FC = () => {
  return (
    <Box className={style.blockWrapper}>
      <Companion />
      <Product />
      <Dialogue />
    </Box>
  );
};

export default DialogueBlock;
