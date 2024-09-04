import { FC } from "react";
import { Box } from "@mui/material";
import { Icons } from "@/components";
import style from "./IconsData.module.scss";

const IconsData: FC = () => {
  return (
    <Box className={style.blockWrapper}>
      <Icons scss="iconsData" />
    </Box>
  );
};

export default IconsData;
