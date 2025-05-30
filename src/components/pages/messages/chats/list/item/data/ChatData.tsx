import { FC } from "react";
import { Box } from "@mui/material";
import { IconsData, TimeData } from "@/components";
import { ChatType } from "@/types/messages/chats";
import style from "./ChatData.module.scss";

interface ChatDataType {
  lastMessageDate: string;
  selectedChatId: number | null | undefined;
  chatId: number | undefined;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
  chat: ChatType | undefined;
}

const ChatData: FC<ChatDataType> = ({
  lastMessageDate,
  chatId,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
  chat,
}) => {
  return (
    <Box className={style.blockWrapper}>
      <TimeData lastMessageDate={lastMessageDate} chat={chat} />
      <IconsData
        chatId={chatId}
        isHeartSelected={isHeartSelected}
        setHeartSelected={setHeartSelected}
        isArchived={isArchived}
        setArchived={setArchived}
      />
    </Box>
  );
};

export default ChatData;
