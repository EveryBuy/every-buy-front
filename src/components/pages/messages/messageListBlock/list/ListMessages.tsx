"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { ItemMessage } from "@/components";
import style from "./ListMessages.module.scss";

interface ListMessagesType {
  messages: MessageType[];
}

interface MessageType {
  id: number;
  picture: string;
  alt: string;
  title: string;
  text: string;
}

const ListMessages: FC<ListMessagesType> = ({ messages }) => {
  return (
    <Box className={style.listWrapper}>
      {messages.map(({ id, picture, title, text, alt }) => (
        <Box sx={{ borderBottom: "solid 1px gray" }} key={id}>
          <ItemMessage picture={picture} title={title} text={text} alt={alt} />
        </Box>
      ))}
    </Box>
  );
};

export default ListMessages;
