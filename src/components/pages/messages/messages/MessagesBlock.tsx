import { FC } from "react";
import { Box } from "@mui/material";
import {
  Companion,
  Product,
  Dialogue,
  EmptyDialogueMessage,
} from "@/components";
import style from "./MessagesBlock.module.scss";

type MessagesBlockType = {
  chatId: number | null;
  setSelectedChatId: (chatId: number | null) => void;
};

const MessagesBlock: FC<MessagesBlockType> = ({
  chatId,
  setSelectedChatId,
}) => {
  return !chatId ? (
    <Box className={style.noMessagesBlockWrapper}>
      <EmptyDialogueMessage />
    </Box>
  ) : (
    <Box
      className={
        chatId ? `${style.blockWrapper} ${style.visible}` : style.blockWrapper
      }
    >
      {/* setSelectedChatId - for mobile version */}
      <Companion setSelectedChatId={setSelectedChatId} />
      <Product />
      <Dialogue chatId={chatId} />
    </Box>
  );
};

export default MessagesBlock;
