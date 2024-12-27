"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { Icons, CommonIcon } from "@/components";
import style from "./IconsData.module.scss";
interface IconsDataType {
  chatId: number | undefined;
}

const IconsData: FC<IconsDataType> = ({ chatId }) => {
  return (
    <>
      <Box className={style.iconsDataWrapper}>
        <CommonIcon
          id="icon-heart"
          className={`${style.icon} ${style.trash}`}
        />
      </Box>
      <Box className={style.iconsDataLaptopWrapper}>
        <Icons scss="iconsData" isItTopBlock={false} chatId={chatId} />
      </Box>
    </>
  );
};

export default IconsData;
