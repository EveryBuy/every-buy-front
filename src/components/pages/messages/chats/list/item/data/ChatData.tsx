import { FC } from "react";
import { Box } from "@mui/material";
import { IconsData, TimeData } from "@/components";
import style from "./ChatData.module.scss";

interface ChatDataType {
  lastMessageDate: string;
  selectedChatId: number | null | undefined;
}

const ChatData: FC<ChatDataType> = ({ lastMessageDate, selectedChatId }) => {
  return (
    <Box className={style.blockWrapper}>
      <TimeData lastMessageDate={lastMessageDate} />
      <IconsData selectedChatId={selectedChatId} />
    </Box>
  );
};

export default ChatData;
