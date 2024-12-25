import { FC } from "react";
import { CommonIcon } from "@/components";
import style from "./Icons.module.scss";

interface IconsBlockType {
  scss?: keyof typeof style;
  isItTopBlock: boolean;
  statusHeartHandler?: () => void;
  statusFolderHandler?: () => void;
  isHeartSelected?: boolean;
  handlerHeartSelected?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setArchived?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Icons: FC<IconsBlockType> = ({
  scss,
  isItTopBlock,
  statusHeartHandler,
  statusFolderHandler,
  isHeartSelected,
  handlerHeartSelected,
  setArchived,
}) => {
  const wrapperFunction = () => {};
  return (
    <>
      {isItTopBlock ? (
        <CommonIcon
          id="icon-heart"
          className={`${style.icon} ${scss ? style[scss] : ""}`}
          onClick={statusHeartHandler}
        />
      ) : (
        <CommonIcon
          id={isHeartSelected ? "icon-heart-selected" : "icon-heart"}
          className={`${style.icon} ${scss ? style[scss] : ""}`}
          onClick={handlerHeartSelected as any}
        />
      )}
      {isItTopBlock ? (
        <CommonIcon
          id="folder"
          className={`${style.icon} ${style.folder} ${scss ? style[scss] : ""}`}
          onClick={statusFolderHandler}
        />
      ) : (
        <CommonIcon
          id="folder"
          className={`${style.icon} ${style.folder} ${scss ? style[scss] : ""}`}
          onClick={setArchived as any}
        />
      )}
      <CommonIcon
        id="trash"
        className={`${style.icon} ${style.trash} ${scss ? style[scss] : ""}`}
        // onClick={statusFolderHandler}
      />
    </>
  );
};

export default Icons;
