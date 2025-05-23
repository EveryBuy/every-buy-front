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
  blockUserWindowHandle: () => void;
  complaintWindowHandle: () => void;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
};

const MessagesBlock: FC<MessagesBlockType> = ({
  chatId,
  setSelectedChatId,
  blockUserWindowHandle,
  complaintWindowHandle,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
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
      <Companion
        setSelectedChatId={setSelectedChatId}
        blockUserWindowHandle={blockUserWindowHandle}
        complaintWindowHandle={complaintWindowHandle}
        chatId={chatId}
        isHeartSelected={isHeartSelected}
        setHeartSelected={setHeartSelected}
        isArchived={isArchived}
        setArchived={setArchived}
      />
      <Product />
      <Dialogue chatId={chatId} />
    </Box>
  );
};

export default MessagesBlock;
