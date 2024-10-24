"use client";

import { FC, useState } from "react";
import { Box } from "@mui/material";
import { ChatsBlock, MessagesBlock } from "@/components";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useGetMessagesByChatIdQuery(selectedChatId as number, {
    skip: selectedChatId === null,
  });

  return (
    <>
      <h1 className="title">Повідомлення</h1>
      <Box className={styles.wrapper}>
        <ChatsBlock onclick={setSelectedChatId} />
        <MessagesBlock chatId={selectedChatId} />
      </Box>
    </>
  );
};

export default MessagesWrapper;
