import { FC } from "react";
import { Box } from "@mui/material";
import { CommonIcon } from "@/components";
import { formatMessageTime } from "@/utils/formatMessageDate";
import { ChatType } from "@/types/messages/chats";
import style from "./TimeData.module.scss";

interface TimeDataType {
  lastMessageDate: string;
  chat: ChatType | undefined;
}

const TimeData: FC<TimeDataType> = ({ lastMessageDate, chat }) => {
  const formattedDate = formatMessageTime(lastMessageDate);
  // const hasUnread =
  //   chat &&
  //   typeof chat.unreadMessagesCount === "number" &&
  //   chat.unreadMessagesCount > 0;
  const hasUnread = chat && chat.read === false;

  return (
    <div className={style.blockWrapper}>
      {hasUnread ? (
        <CommonIcon id="message-tick" className={style.icon} />
      ) : (
        <CommonIcon id="message-double-tick" className={style.icon} />
      )}
      <Box className={style.time}>{formattedDate}</Box>
    </div>
  );
};

export default TimeData;
