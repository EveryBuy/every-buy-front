"use client";

import { FC, useState } from "react";
import { Box } from "@mui/material";
import { ChatsBlock, MessagesBlock } from "@/components";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  // for mobile version
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  useGetMessagesByChatIdQuery(selectedChatId as number, {
    skip: selectedChatId === null,
  });

  return (
    <div className={styles.pageWrapper}>
      <h1 className={`title ${styles.headline}`}>Повідомлення</h1>
      <Box className={styles.chatBlockWrapper}>
        <ChatsBlock
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
        />
        <MessagesBlock
          chatId={selectedChatId}
          setSelectedChatId={setSelectedChatId} // for mobile version
        />
      </Box>
    </div>
  );
};

export default MessagesWrapper;
