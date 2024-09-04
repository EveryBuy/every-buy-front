import { FC } from "react";
import { Box } from "@mui/material";
import { CommonIcon } from "@/components";
import style from "./TimeData.module.scss";

const TimeData: FC = () => {
  return (
    <div className={style.blockWrapper}>
      <CommonIcon id="message-tick" className={style.icon} />
      <Box>10:54</Box>
    </div>
  );
};

export default TimeData;
