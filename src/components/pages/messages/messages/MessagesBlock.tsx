import { FC } from "react";
import { Box } from "@mui/material";
import { Companion, Product, Dialogue } from "@/components";
import style from "./MessagesBlock.module.scss";

type MessagesBlockType = {
  chatId: number | null;
  // setSelectedChatId: (chatId: number | null) => void;
};

const MessagesBlock: FC<MessagesBlockType> = ({ chatId }) => {
  return (
    <Box className={style.blockWrapper}>
      <Companion />
      <Product />
      <Dialogue chatId={chatId} />
    </Box>
  );
};

export default MessagesBlock;
