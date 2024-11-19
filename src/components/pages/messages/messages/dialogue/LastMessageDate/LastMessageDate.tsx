import { FC } from "react";
import { Box } from "@mui/material";
import { formatMessageDate } from "@/utils/formatMessageDate";
import { MessageType } from "@/types/messages/messages";
import style from "./LastMessageDate.module.scss";

interface LastMessageDate {
  messages: MessageType[];
}

const LastMessageDate: FC<LastMessageDate> = ({ messages }) => {
  return (
    <Box className={style.dateWrapper}>
      <Box className={style.date}>
        {formatMessageDate(messages[messages.length - 1].creationTime)}
      </Box>
    </Box>
  );
};

export default LastMessageDate;
