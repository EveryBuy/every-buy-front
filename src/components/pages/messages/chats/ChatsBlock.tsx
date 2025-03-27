"use client";
import { FC, useState } from "react";
import { Box } from "@mui/material";
import { ChatsList, Buttons, Icons, CommonIcon } from "@/components";
import {
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
  useGetFavoritesChatsQuery,
  useGetArchivedChatsQuery,
} from "@/redux/messages/chatApi";
import style from "./ChatsBlock.module.scss";

type ChatsBlockType = {
  setSelectedChatId: (selectedChatId: number) => void;
  selectedChatId: number | null;
};

const ChatsBlock: FC<ChatsBlockType> = ({
  setSelectedChatId,
  selectedChatId,
}) => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [isHeartSelected, setHeardSelected] = useState<boolean>(false);
  const [isFolderSelected, setFolderSelected] = useState<boolean>(false);
  const {
    data: buyChats,
    isFetching: isBuyChatsFetching,
    // isLoading: isBuyChatsLoading,
    // isError: isBuyChatsError,
  } = useGetBuyChatsQuery();
  const {
    data: sellChats,
    isFetching: isSellChatsFetching,
    // isLoading: isSellChatsLoading,
    // isError: isSellChatsError,
  } = useGetSellChatsQuery();
  const { data: favoritesChats } = useGetFavoritesChatsQuery();
  const { data: archivedChats } = useGetArchivedChatsQuery();
  console.log(buyChats);

  // filter chats and hidden them if they are in the archive
  let updatedBuyChats;
  let updatedSellChats;
  if (buyChats && archivedChats && sellChats) {
    updatedBuyChats = buyChats.filter(
      (itemBuyChat) =>
        !archivedChats.some(
          (itemArchivedChats) => itemBuyChat.chatId === itemArchivedChats.chatId
        )
    );
    updatedSellChats = sellChats.filter(
      (itemSellChat) =>
        !archivedChats.some(
          (itemArchivedChats) =>
            itemSellChat.chatId === itemArchivedChats.chatId
        )
    );
  }

  // choose the chat depends on what button you clicked
  let chats;
  if (favoritesChats || archivedChats) {
    chats = isHeartSelected
      ? favoritesChats
      : isFolderSelected
      ? archivedChats
      : activeButton === 1
      ? updatedBuyChats
      : updatedSellChats;
  }

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };
  const handleIconHeartClick = () => {
    setHeardSelected((prev) => !prev);
  };
  const handleIconFolderClick = () => {
    setFolderSelected((prev) => !prev);
  };

  const getButtonStyle = (buttonId: number) => {
    return {
      borderBottom: activeButton === buttonId ? "3px solid #000000" : "",
    };
  };

  return (
    <Box
      className={
        selectedChatId
          ? `${style.blockWrapper} ${style.hidden}`
          : style.blockWrapper
      }
    >
      <Box className={style.buttonsWrapper}>
        {isHeartSelected ? (
          <Box className={style.savedMessagesHeaderBlock}>
            <Box className={style.text}>
              <CommonIcon
                id="message-left-arrow"
                className={style.arrow}
                onClick={handleIconHeartClick}
              />
              <p>Збережені повідомлення</p>
            </Box>
            <CommonIcon id="icon-heart-selected" className={style.iconHeart} />
          </Box>
        ) : isFolderSelected ? (
          <Box className={style.savedMessagesHeaderBlock}>
            <Box className={style.text}>
              <CommonIcon
                id="message-left-arrow"
                className={style.arrow}
                onClick={handleIconFolderClick}
              />
              <p>Архівовані повідомлення</p>
            </Box>
            <CommonIcon id="folder" className={style.iconFolder} />
          </Box>
        ) : (
          <>
            <Buttons
              typeHandle={handleButtonClick}
              styleButton={getButtonStyle}
              typeButtonBuyStatus={activeButton === 1}
              typeButtonSellStatus={activeButton === 2}
            />
            <Box className={style.iconsWrapper}>
              <Icons
                isItTopBlock={true}
                statusHeartHandler={handleIconHeartClick}
                statusFolderHandler={handleIconFolderClick}
              />
            </Box>
          </>
        )}
      </Box>
      <ChatsList
        chats={chats}
        setSelectedChatId={setSelectedChatId}
        selectedChatId={selectedChatId}
        isBuyChatsLoading={isBuyChatsFetching}
        isSellChatsLoading={isSellChatsFetching}
      />
    </Box>
  );
};

export default ChatsBlock;
