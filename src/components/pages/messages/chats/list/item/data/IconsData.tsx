"use client";

import { FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Icons, CommonIcon } from "@/components";
import {
  useAddChatToFavoritesMutation,
  useRemoveChatFromFavoritesMutation,
  useGetFavoritesChatsQuery,
  useGetArchivedChatsQuery,
} from "@/redux/messages/chatApi";
import style from "./IconsData.module.scss";
interface IconsDataType {
  chatId: number | undefined;
}

const IconsData: FC<IconsDataType> = ({ chatId }) => {
  const [addChatToFavorites] = useAddChatToFavoritesMutation();
  const [removeChatFromFavorites] = useRemoveChatFromFavoritesMutation();
  const [isHeartSelected, setHeartSelected] = useState(false);
  const { data: favoritesChats } = useGetFavoritesChatsQuery();

  useEffect(() => {
    if (favoritesChats) {
      const isIdInFavorites = favoritesChats.some(
        (chat) => chat.chatId === chatId
      );
      isIdInFavorites && setHeartSelected(true);
    }
  }, [favoritesChats, chatId]);

  const handlerHeartSelected = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setHeartSelected((prev) => !prev);
    try {
      if (chatId) {
        await addChatToFavorites({ chatId: chatId }).unwrap();
        console.log("Chat added to favorites!");
      }
    } catch (error) {
      setHeartSelected((prev) => !prev);
      console.error("Failed to add to favorites:", error);
    }
  };

  const handlerHeartRemovedFromSelected = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setHeartSelected((prev) => !prev);
    try {
      if (chatId) {
        await removeChatFromFavorites({ chatId: chatId }).unwrap();
        console.log("Chat removed from favorites!");
      }
    } catch (error) {
      setHeartSelected((prev) => !prev);
      console.error("Failed to remove from favorites:", error);
    }
  };

  return (
    <>
      <Box className={style.iconsDataWrapper}>
        <CommonIcon
          // id="icon-heart"
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
        />
      </Box>
      <Box className={style.iconsDataLaptopWrapper}>
        <Icons
          scss="iconsData"
          isItTopBlock={false}
          chatId={chatId}
          isHeartSelected={isHeartSelected}
          handlerHeartRemovedFromSelected={handlerHeartRemovedFromSelected}
          handlerHeartSelected={handlerHeartSelected}
        />
      </Box>
    </>
  );
};

export default IconsData;
