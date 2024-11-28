import { FC } from "react";
import { Box } from "@mui/material";
import { CommonIcon } from "@/components";
import style from "./Icons.module.scss";

interface IconsType {
  scss?: keyof typeof style;
  // status?: boolean;
  statusHeartHandler?: () => void;
  statusFolderHandler?: () => void;
}

const Icons: FC<IconsType> = ({
  scss,
  statusHeartHandler,
  statusFolderHandler,
}) => {
  return (
    <>
      <CommonIcon
        id="icon-heart"
        className={`${style.icon} ${scss ? style[scss] : ""}`}
        onClick={statusHeartHandler}
      />
      <CommonIcon
        id="folder"
        className={`${style.icon} ${style.folder} ${scss ? style[scss] : ""}`}
        onClick={statusFolderHandler}
      />
      <CommonIcon
        id="trash"
        className={`${style.icon} ${style.trash} ${scss ? style[scss] : ""}`}
        // onClick={statusFolderHandler}
      />
    </>
  );
};

export default Icons;
