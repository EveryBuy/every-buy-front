import { FC } from "react";
import { Box } from "@mui/material";
import { Icons, CommonIcon } from "@/components";
import style from "./IconsData.module.scss";

const IconsData: FC = () => {
  return (
    <>
      <Box className={style.iconsDataWrapper}>
        <CommonIcon
          id="icon-heart"
          className={`${style.icon} ${style.trash}`}
          // onClick={statusFolderHandler}
        />
      </Box>
      <Box className={style.iconsDataLaptopWrapper}>
        <Icons scss="iconsData" isItTopBlock={false} />
      </Box>
    </>
  );
};

export default IconsData;
