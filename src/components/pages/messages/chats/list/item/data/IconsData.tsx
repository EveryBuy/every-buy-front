"use client";

import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavoriteMessage } from "@/redux/messages/slice";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import { Icons, CommonIcon } from "@/components";
import {
  useAddChatToFavoritesMutation,
  useRemoveChatFromFavoritesMutation,
  useGetFavoritesChatsQuery,
  useAddChatToArchiveMutation,
  useRemoveChatFromArchiveMutation,
  useGetArchivedChatsQuery,
} from "@/redux/messages/chatApi";
import style from "./IconsData.module.scss";
interface IconsDataType {
  chatId: number | undefined;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
}

const IconsData: FC<IconsDataType> = ({
  chatId,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
}) => {
  const [addChatToFavorites] = useAddChatToFavoritesMutation();
  const [removeChatFromFavorites] = useRemoveChatFromFavoritesMutation();
  const { data: favoritesChats } = useGetFavoritesChatsQuery();
  const [addChatToArchive] = useAddChatToArchiveMutation();
  const [removeChatFromArchive] = useRemoveChatFromArchiveMutation();
  const { data: archivedChats } = useGetArchivedChatsQuery();

  useEffect(() => {
    if (favoritesChats) {
      const isIdInFavorites = favoritesChats.some(
        (chat) => chat.chatId === chatId
      );
      isIdInFavorites && setHeartSelected(true);
    }
  }, [favoritesChats, chatId, setHeartSelected]);

  const handlerHeartSelected = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setHeartSelected(!isHeartSelected);
    try {
      if (chatId) {
        await addChatToFavorites({ chatId: chatId }).unwrap();
        console.log("Chat added to favorites!");
      }
    } catch (error) {
      setHeartSelected(!isHeartSelected);
      console.error("Failed to add to favorites:", error);
    }
  };

  const handlerHeartRemovedFromSelected = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setHeartSelected(!isHeartSelected);
    try {
      if (chatId) {
        await removeChatFromFavorites({ chatId: chatId }).unwrap();
        console.log("Chat removed from favorites!");
      }
    } catch (error) {
      setHeartSelected(!isHeartSelected);
      console.error("Failed to remove from favorites:", error);
    }
  };

  useEffect(() => {
    if (archivedChats) {
      const isIdInArchived = archivedChats.some(
        (chat) => chat.chatId === chatId
      );
      isIdInArchived && setArchived(true);
    }
  }, [archivedChats, chatId, setArchived]);

  const addToArchive = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setArchived(!isArchived);
    try {
      if (chatId) {
        await addChatToArchive({ chatId: chatId }).unwrap();
        console.log("Chat added to the archive!");
      }
    } catch (error) {
      setArchived(!isArchived);
      console.error("Failed to add to the archive:", error);
    }
  };

  const removeFromArchive = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setArchived(!isArchived);
    try {
      if (chatId) {
        await removeChatFromArchive({ chatId: chatId }).unwrap();
        console.log("Chat removed from the archive!");
      }
    } catch (error) {
      setArchived(!isArchived);
      console.error("Failed to remove from the archive:", error);
    }
  };
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    chatId ? state.messages.favorites[chatId] : false
  );
  return (
    <>
      <Box className={style.iconsDataWrapper}>
        {/* <CommonIcon
          id={isHeartSelected ? "icon-heart-selected" : "icon-heart"}
          className={`${style.icon} ${style.trash}`}
          // @ts-ignore
          onClick={(e) => {
            if (chatId) {
              isHeartSelected
                ? handlerHeartRemovedFromSelected(chatId, e)
                : handlerHeartSelected(chatId, e);
            }
          }}
        /> */}
        <CommonIcon
          id={isFavorite ? "icon-heart-selected" : "icon-heart"}
          className={`${style.icon} ${style["iconsData"]}`}
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
      </Box>
      <Box className={style.iconsDataLaptopWrapper}>
        <Icons
          scss="iconsData"
          isItTopBlock={false}
          chatId={chatId}
          handlerHeartRemovedFromSelected={handlerHeartRemovedFromSelected}
          handlerHeartSelected={handlerHeartSelected}
          isArchived={isArchived}
          addToArchive={addToArchive}
          removeFromArchive={removeFromArchive}
        />
      </Box>
    </>
  );
};

export default IconsData;
