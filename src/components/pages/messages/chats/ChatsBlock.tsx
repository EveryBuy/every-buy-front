"use client";
import { FC, useState } from "react";
import { Box } from "@mui/material";
import { ChatsList, ButtonsIconBlock } from "@/components";
import {
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
  useGetFavoritesChatsQuery,
  useGetArchivedChatsQuery,
} from "@/redux/messages/chatApi";
import { ChatsBlockType } from "@/types/messages/chats";

const ChatsBlock: FC<ChatsBlockType> = ({
  setSelectedChatId,
  selectedChatId,
  activeChatId,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
}) => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [isSelected, setSelected] = useState<boolean>(false);
  const [isFolderSelected, setFolderSelected] = useState<boolean>(false);
  const {
    data: buyChats = [],
    // refetch: refetchBuyChats,
    // isLoading: isBuyChatsLoading,
    isFetching: isBuyChatsFetching,
  } = useGetBuyChatsQuery();
  const {
    data: sellChats = [],
    // refetch: refetchSellChats,
    // isLoading: isSellChatsLoading,
    isFetching: isSellChatsFetching,
  } = useGetSellChatsQuery();
  const { data: favoritesChats } = useGetFavoritesChatsQuery();
  const { data: archivedChats } = useGetArchivedChatsQuery();

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
    chats = isSelected
      ? favoritesChats
      : isFolderSelected
      ? archivedChats
      : activeButton === 1
      ? updatedBuyChats
      : updatedSellChats;
  }
  console.log(chats);

  // styles
  const isHidden = selectedChatId || activeChatId;

  return (
    <Box
      sx={{
        flexDirection: "column",
        width: "100%",
        "@media (max-width: 1023px)": {
          display: isHidden ? "none" : "flex",
        },
        "@media (min-width: 1024px)": {
          display: "flex",
          width: "36%",
        },
      }}
    >
      <ButtonsIconBlock
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        isSelected={isSelected}
        setSelected={setSelected}
        isFolderSelected={isFolderSelected}
        setFolderSelected={setFolderSelected}
      />
      <ChatsList
        chats={chats}
        setSelectedChatId={setSelectedChatId}
        isBuyChatsLoading={isBuyChatsFetching}
        isSellChatsLoading={isSellChatsFetching}
        isHeartSelected={isHeartSelected}
        setHeartSelected={setHeartSelected}
        isArchived={isArchived}
        setArchived={setArchived}
      />
    </Box>
  );
};

export default ChatsBlock;
