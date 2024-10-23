"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { Chat } from "@/components";
import { ChatType } from "@/types/messages/chats";
import style from "./ChatsList.module.scss";

// TODO create slice
// TODO onclick => make request, take messages by id => save to redux

interface ListChatsType {
  chats?: ChatType[];
}

const ChatsList: FC<ListChatsType> = ({ chats }) => {
  if (!chats) {
    return <p>Завантажується...</p>;
  }

  return (
    <Box className={style.listWrapper}>
      {chats.map(({ chatId, userData, lastMessage, lastMessageDate }) => (
        <Box sx={{ borderBottom: "solid 1px gray" }} key={chatId}>
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
