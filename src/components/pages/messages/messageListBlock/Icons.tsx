import { FC } from "react";
import { Box } from "@mui/material";
import CommonIcon from "@/components/ui/CommonIcon/CommonIcon";
import style from "./Icons.module.scss";

const Icons: FC = () => {
  return (
    <Box className={style.iconsWrapper}>
      <Box
        sx={{
          cursor: "pointer",
        }}
      >
        <CommonIcon id="icon-heart" width="32" height="33" />
      </Box>
      <Box
        sx={{
          cursor: "pointer",
        }}
      >
        <CommonIcon id="folder" width="33" height="33" />
      </Box>
    </Box>
  );
};

export default Icons;
