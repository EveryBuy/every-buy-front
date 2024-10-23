import { FC } from "react";
import { Box } from "@mui/material";
import { CommonIcon } from "@/components";
import formatMessageDate from "@/utils/formatMessageDate";
import style from "./TimeData.module.scss";

interface TimeDataType {
  lastMessageDate: string;
}

const TimeData: FC<TimeDataType> = ({ lastMessageDate }) => {
  const formattedDate = formatMessageDate(lastMessageDate);
  return (
    <div className={style.blockWrapper}>
      <CommonIcon id="message-tick" className={style.icon} />
      <Box className={style.time}>{formattedDate}</Box>
    </div>
  );
};

export default TimeData;
