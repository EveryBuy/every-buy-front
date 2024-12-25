"use client";

import { FC, useState } from "react";
import { Box } from "@mui/material";
import { Icons, CommonIcon } from "@/components";
import style from "./IconsData.module.scss";
interface IconsDataType {
  selectedChatId: number | null | undefined;
}

const IconsData: FC<IconsDataType> = ({ selectedChatId }) => {
  const [isHeartSelected, setHeartSelected] = useState(false);
  const [, setArchived] = useState(false);
  const handlerHeartSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setHeartSelected((prev) => !prev);
  };
  const handlerArchived = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setArchived((prev) => !prev);
  };
  console.log(selectedChatId);

  return (
    <>
      <Box className={style.iconsDataWrapper}>
        <CommonIcon
          id="icon-heart"
          className={`${style.icon} ${style.trash}`}
        />
      </Box>
      <Box className={style.iconsDataLaptopWrapper}>
        <Icons
          scss="iconsData"
          isItTopBlock={false}
          isHeartSelected={isHeartSelected}
          handlerHeartSelected={handlerHeartSelected}
          setArchived={handlerArchived}
        />
      </Box>
    </>
  );
};

export default IconsData;
