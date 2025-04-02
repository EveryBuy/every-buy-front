"use client";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { ChatsBlock, MessagesBlock } from "@/components";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import { RootState } from "@/redux/store";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  // for mobile version
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const newChatId = useSelector((state: RootState) => state.messages.chatId);
  const activeChatId = selectedChatId ?? newChatId;
  // useGetMessagesByChatIdQuery(selectedChatId as number, {
  //   skip: selectedChatId === null,
  // });
  useGetMessagesByChatIdQuery(selectedChatId as number, {
    skip: activeChatId === null,
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
          // chatId={selectedChatId}
          chatId={activeChatId}
          setSelectedChatId={setSelectedChatId} // for mobile version
        />
      </Box>
    </div>
  );
};

export default MessagesWrapper;
