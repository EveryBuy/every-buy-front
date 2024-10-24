"use client";

import { FC, useState } from "react";
import { Box } from "@mui/material";
import { Chat } from "@/components";
import { ChatType } from "@/types/messages/chats";
import style from "./ChatsList.module.scss";

// TODO create slice
// TODO onclick => make request, take messages by id => save to redux

interface ListChatsType {
  chats?: ChatType[];
  onclick: (chatId: number) => void;
}

const ChatsList: FC<ListChatsType> = ({ chats, onclick }) => {
  if (!chats) {
    return <p>Завантажується...</p>;
  }

  const handleChatClick = (chatId: number) => {
    // setSelectedChatId(chatId);
    onclick(chatId);
  };

  return (
    <Box className={style.listWrapper}>
      {chats.map(({ chatId, userData, lastMessage, lastMessageDate }) => (
        <Box
          sx={{ borderBottom: "solid 1px gray" }}
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
          />
        </Box>
      ))}
    </Box>
  );
};

export default ChatsList;
