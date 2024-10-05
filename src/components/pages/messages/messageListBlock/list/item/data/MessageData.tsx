import { FC } from "react";
import { Box } from "@mui/material";
import { IconsData, TimeData } from "@/components";
import style from "./MessageData.module.scss";

const MessageData: FC = () => {
  return (
    <Box className={style.blockWrapper}>
      <TimeData />
      <IconsData />
    </Box>
  );
};

export default MessageData;
