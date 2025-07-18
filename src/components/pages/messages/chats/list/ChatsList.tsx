import { FC } from "react";
import { useAppDispatch } from "@/redux/store";
import { Box } from "@mui/material";
import { Chat, CommonPreloader } from "@/components";
import {
  ChatType,
  FavoritesChatType,
  ArchivedChatType,
} from "@/types/messages/chats";
import { chatApi } from "@/redux/messages/chatApi";
import style from "./ChatsList.module.scss";

interface ChatsListType {
  chats?: ChatType[] | FavoritesChatType[] | ArchivedChatType[] | undefined;
  setSelectedChatId: (chatId: number) => void;
  isBuyChatsLoading: boolean;
  isSellChatsLoading: boolean;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
}

const ChatsList: FC<ChatsListType> = ({
  chats,
  setSelectedChatId,
  isBuyChatsLoading,
  isSellChatsLoading,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
  // isCompanionBlocked,
  // isUserBlockedByCompanion,
}) => {
  const dispatch = useAppDispatch();
  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
    dispatch(chatApi.util.invalidateTags([{ type: "Messages", id: chatId }]));
    dispatch(
      chatApi.util.updateQueryData("getBuyChats", undefined, (draft) => {
        const chat = draft?.find((c) => c.chatId === chatId);
        if (chat) chat.unreadMessagesCount = 0;
      })
    );
    dispatch(
      chatApi.util.updateQueryData("getSellChats", undefined, (draft) => {
        const chat = draft?.find((c) => c.chatId === chatId);
        if (chat) chat.unreadMessagesCount = 0;
      })
    );
  };

  return (
    <Box>
      {isBuyChatsLoading || isSellChatsLoading ? (
        <Box
          className={style.listWrapper}
          sx={{
            paddingTop: "200px",
          }}
        >
          <CommonPreloader sx={{ color: "#e5ff46" }} />
        </Box>
      ) : chats && chats.length > 0 ? (
        <Box className={style.listWrapper}>
          {chats.map((chat) => (
            <Box
              key={chat.chatId}
              className={style.listItem}
              onClick={() => {
                if (chat.chatId) {
                  handleChatClick(chat.chatId);
                }
              }}
            >
              <Chat
                lastMessage={chat.lastMessage}
                userData={chat.userData}
                lastMessageDate={chat.lastMessageDate}
                chatId={chat.chatId}
                isHeartSelected={isHeartSelected}
                setHeartSelected={setHeartSelected}
                isArchived={isArchived}
                setArchived={setArchived}
                chat={chat as ChatType}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          className={style.listWrapper}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#9d9d9d",
          }}
        >
          You have no messages yet
        </Box>
      )}
    </Box>
  );
};

export default ChatsList;
