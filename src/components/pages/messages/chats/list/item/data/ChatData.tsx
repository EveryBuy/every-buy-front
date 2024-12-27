import { FC } from "react";
import { Box } from "@mui/material";
import { IconsData, TimeData } from "@/components";
import style from "./ChatData.module.scss";

interface ChatDataType {
  lastMessageDate: string;
  selectedChatId: number | null | undefined;
  // handleChatClick: (chatId: number) => void;
  chatId: number | undefined;
}

const ChatData: FC<ChatDataType> = ({ lastMessageDate, chatId }) => {
  return (
    <Box className={style.blockWrapper}>
      <TimeData lastMessageDate={lastMessageDate} />
      <IconsData
        chatId={chatId}
        // handleChatClick={handleChatClick}
      />
    </Box>
  );
};

export default ChatData;
