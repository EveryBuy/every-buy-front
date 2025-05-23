"use client";

import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavoriteMessage } from "@/redux/messages/slice";
import { RootState } from "@/redux/store";
import { CommonIcon } from "@/components";
import IconsBlockType from "@/types/messages/icons";
import style from "./Icons.module.scss";

const Icons: FC<IconsBlockType> = ({
  scss,
  isItTopBlock,
  statusHeartHandler,
  statusFolderHandler,
  chatId,
  handlerHeartRemovedFromSelected,
  handlerHeartSelected,
  isArchived,
  addToArchive,
  removeFromArchive,
}) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    chatId ? state.messages.favorites[chatId] : false
  );

  return (
    <>
      {isItTopBlock ? (
        <>
          <CommonIcon
            id="icon-heart"
            className={`${style.icon} ${scss ? style[scss] : ""}`}
            onClick={statusHeartHandler}
          />
          <CommonIcon
            id="folder"
            className={`${style.icon} ${style.folder} ${
              scss ? style[scss] : ""
            }`}
            onClick={statusFolderHandler}
          />
        </>
      ) : (
        <>
          <CommonIcon
            id={isFavorite ? "icon-heart-selected" : "icon-heart"}
            className={`${style.icon} ${scss ? style[scss] : ""}`}
            // @ts-ignore
            onClick={(e) => {
              if (!chatId) return;
              dispatch(toggleFavoriteMessage(chatId));
              if (handlerHeartRemovedFromSelected && handlerHeartSelected) {
                isFavorite
                  ? handlerHeartRemovedFromSelected(chatId, e)
                  : handlerHeartSelected(chatId, e);
              }
            }}
          />
          <CommonIcon
            id="folder"
            className={`${style.icon} ${style.folder} ${
              scss ? style[scss] : ""
            }`}
            // @ts-ignore
            onClick={(e) => {
              if (chatId && removeFromArchive && addToArchive) {
                isArchived
                  ? removeFromArchive(chatId, e)
                  : addToArchive(chatId, e);
              }
            }}
          />
        </>
      )}
      {/* <CommonIcon
        id="folder"
        className={`${style.icon} ${style.trash} ${scss ? style[scss] : ""}`}
        // onClick={statusFolderHandler}
      /> */}
    </>
  );
};

export default Icons;
