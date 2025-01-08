"use client";

import { FC, useState, useEffect } from "react";
import { CommonIcon } from "@/components";
import IconsBlockType from "@/types/messages/icons";
import {
  // useAddChatToFavoritesMutation,
  // useRemoveChatFromFavoritesMutation,
  useAddChatToArchiveMutation,
  useRemoveChatFromArchiveMutation,
  // useGetFavoritesChatsQuery,
  useGetArchivedChatsQuery,
} from "@/redux/messages/chatApi";
import style from "./Icons.module.scss";

const Icons: FC<IconsBlockType> = ({
  scss,
  isItTopBlock,
  statusHeartHandler,
  statusFolderHandler,
  chatId,
  isHeartSelected,
  handlerHeartRemovedFromSelected,
  handlerHeartSelected,
}) => {
  // const [addChatToFavorites] = useAddChatToFavoritesMutation();
  // const [removeChatFromFavorites] = useRemoveChatFromFavoritesMutation();
  const [addChatToArchive] = useAddChatToArchiveMutation();
  const [removeChatFromArchive] = useRemoveChatFromArchiveMutation();
  // const [isHeartSelected, setHeartSelected] = useState(false);
  const [isArchived, setArchived] = useState(false);
  //
  // const { data: favoritesChats } = useGetFavoritesChatsQuery();
  const { data: archivedChats } = useGetArchivedChatsQuery();

  // useEffect(() => {
  //   if (favoritesChats) {
  //     const isIdInFavorites = favoritesChats.some(
  //       (chat) => chat.chatId === chatId
  //     );
  //     isIdInFavorites && setHeartSelected(true);
  //   }
  // }, [favoritesChats, chatId]);

  useEffect(() => {
    if (archivedChats) {
      const isIdInArchived = archivedChats.some(
        (chat) => chat.chatId === chatId
      );
      isIdInArchived && setArchived(true);
    }
  }, [archivedChats, chatId]);

  // const handlerHeartSelected = async (
  //   chatId: number,
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   e.stopPropagation();
  //   setHeartSelected((prev) => !prev);
  //   try {
  //     if (chatId) {
  //       await addChatToFavorites({ chatId: chatId }).unwrap();
  //       console.log("Chat added to favorites!");
  //     }
  //   } catch (error) {
  //     setHeartSelected((prev) => !prev);
  //     console.error("Failed to add to favorites:", error);
  //   }
  // };

  // const handlerHeartRemovedFromSelected = async (
  //   chatId: number,
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   e.stopPropagation();
  //   setHeartSelected((prev) => !prev);
  //   try {
  //     if (chatId) {
  //       await removeChatFromFavorites({ chatId: chatId }).unwrap();
  //       console.log("Chat removed from favorites!");
  //     }
  //   } catch (error) {
  //     setHeartSelected((prev) => !prev);
  //     console.error("Failed to remove from favorites:", error);
  //   }
  // };

  const addToArchive = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setArchived((prev) => !prev);
    try {
      if (chatId) {
        await addChatToArchive({ chatId: chatId }).unwrap();
        console.log("Chat added to the archive!");
      }
    } catch (error) {
      setArchived((prev) => !prev);
      console.error("Failed to add to the archive:", error);
    }
  };

  const removeFromArchive = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setArchived((prev) => !prev);
    try {
      if (chatId) {
        await removeChatFromArchive({ chatId: chatId }).unwrap();
        console.log("Chat removed from the archive!");
      }
    } catch (error) {
      setArchived((prev) => !prev);
      console.error("Failed to remove from the archive:", error);
    }
  };

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
            id={isHeartSelected ? "icon-heart-selected" : "icon-heart"}
            className={`${style.icon} ${scss ? style[scss] : ""}`}
            // @ts-ignore
            onClick={(e) => {
              if (
                chatId &&
                handlerHeartRemovedFromSelected &&
                handlerHeartSelected
              ) {
                isHeartSelected
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
              if (chatId) {
                isArchived
                  ? removeFromArchive(chatId, e)
                  : addToArchive(chatId, e);
              }
            }}
          />
        </>
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
