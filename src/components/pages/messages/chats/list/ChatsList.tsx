"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { Chat, CommonPreloader } from "@/components";
import { ChatType } from "@/types/messages/chats";
import style from "./ChatsList.module.scss";

interface ChatsListType {
  chats?: ChatType[] | undefined;
  setSelectedChatId: (chatId: number) => void;
  selectedChatId: number | null;
}

const ChatsList: FC<ChatsListType> = ({ chats, setSelectedChatId }) => {
  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
    console.log(chatId);
  };

  return (
    <Box className={style.listWrapper}>
      {chats ? (
        chats.map(({ chatId, userData, lastMessage, lastMessageDate }) => (
          <Box
            className={style.listItem}
            key={chatId}
            onClick={() => {
              if (chatId) {
                handleChatClick(chatId);
              }
            }}
          >
            <Chat
              lastMessage={lastMessage}
              userData={userData}
              lastMessageDate={lastMessageDate}
              // handleChatClick={setSelectedChatId}
              chatId={chatId}
            />
          </Box>
        ))
      ) : (
        <Box
          sx={{
            paddingTop: "50%",
          }}
        >
          <CommonPreloader sx={{ color: "#9d9d9d" }} />
        </Box>
      )}
    </Box>
  );
};

export default ChatsList;
