import { FC } from "react";
import { Box } from "@mui/material";
import { Companion, Product, Dialogue } from "@/components";
import style from "./MessagesBlock.module.scss";

const MessagesBlock: FC = () => {
  return (
    <Box className={style.blockWrapper}>
      <Companion />
      <Product />
      <Dialogue />
    </Box>
  );
};

export default MessagesBlock;
