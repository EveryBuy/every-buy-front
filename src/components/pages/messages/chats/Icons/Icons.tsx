import { FC } from "react";
import { Box } from "@mui/material";
import { CommonIcon } from "@/components";
import style from "./Icons.module.scss";

interface IconsBlockType {
  scss?: keyof typeof style;
  isItTopBlock: boolean;
  statusHeartHandler?: () => void;
  statusFolderHandler?: () => void;
}

const Icons: FC<IconsBlockType> = ({
  scss,
  isItTopBlock,
  statusHeartHandler,
  statusFolderHandler,
}) => {
  return (
    <>
      <CommonIcon
        id="icon-heart"
        className={`${style.icon} ${scss ? style[scss] : ""}`}
        onClick={isItTopBlock ? statusHeartHandler : statusHeartHandler}
      />
      <CommonIcon
        id="folder"
        className={`${style.icon} ${style.folder} ${scss ? style[scss] : ""}`}
        onClick={isItTopBlock ? statusFolderHandler : statusFolderHandler}
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
