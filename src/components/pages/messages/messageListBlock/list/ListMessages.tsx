"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { ItemMessage } from "@/components";
import { MessageType } from "@/types/messages/messages";
import style from "./ListMessages.module.scss";

interface ListMessagesType {
  messages: MessageType[];
}

// interface MessageType {
//   id: number;
//   picture: string;
//   alt: string;
//   title: string;
//   text: string;
// }

const ListMessages: FC<ListMessagesType> = ({ messages }) => {
  if (!messages) {
    return <p>Завантажується...</p>;
  }

  return (
    <Box className={style.listWrapper}>
      {messages.map(({ chatId, userData, lastMessage }) => (
        <Box sx={{ borderBottom: "solid 1px gray" }} key={chatId}>
          <ItemMessage
            // picture={userData.photoUrl}
            title={userData.fullName}
            text={lastMessage}
            alt=""
          />
        </Box>
      ))}
    </Box>
  );
};

export default ListMessages;
