import { FC } from "react";
import { Box } from "@mui/material";
import { IconsData, TimeData } from "@/components";
import style from "./MessageData.module.scss";

interface MessageDataType {
  lastMessageDate: string;
}

const MessageData: FC<MessageDataType> = ({ lastMessageDate }) => {
  return (
    <Box className={style.blockWrapper}>
      <TimeData lastMessageDate={lastMessageDate} />
      <IconsData />
    </Box>
  );
};

export default MessageData;
