"use client";

import { FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import {
  CommonPreloader,
  DialogueMessage,
  EmptyDialogueMessage,
  LastMessageDate,
  DialogueInput,
} from "@/components";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetMessagesByChatIdQuery,
  useGetChatQuery,
} from "@/redux/messages/chatApi";
import { MessageType } from "@/types/messages/messages";
import style from "./Dialogue.module.scss";

type DialogueType = {
  chatId: number | null;
};

const Dialogue: FC<DialogueType> = ({ chatId }) => {
  const [displayedMessages, setDisplayedMessages] = useState<MessageType[]>([]);
  const {
    data: messages,
    error,
    isLoading,
    isFetching,
  } = useGetMessagesByChatIdQuery(chatId ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  useGetChatQuery(chatId ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (chatId !== null) {
      setDisplayedMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    if (messages && !isLoading && !isFetching) {
      setDisplayedMessages(messages);
    }
  }, [messages, isLoading, isFetching]);

  if (isLoading || (isFetching && displayedMessages.length === 0)) {
    return (
      <Box
        sx={{
          paddingTop: "25%",
        }}
      >
        <CommonPreloader sx={{ color: "#9d9d9d" }} />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  return (
    <Box className={style.blockWrapper}>
      {messages ? <LastMessageDate messages={messages} /> : null}

      <Box className={style.dialogueWrapper}>
        {!messages ? (
          <EmptyDialogueMessage />
        ) : (
          displayedMessages.map((message) => (
            <DialogueMessage message={message} key={message.id} />
          ))
        )}
      </Box>
      <DialogueInput />
    </Box>
  );
};

export default Dialogue;
