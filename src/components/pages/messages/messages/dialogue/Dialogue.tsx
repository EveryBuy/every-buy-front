"use client";

import { FC, useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import {
  CommonPreloader,
  DialogueMessage,
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
  const dialogueWrapperRef = useRef<HTMLDivElement | null>(null);

  useGetChatQuery(chatId ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const scrollToBottom = () => {
    if (dialogueWrapperRef.current) {
      dialogueWrapperRef.current.scrollTop =
        dialogueWrapperRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatId !== null) {
      setDisplayedMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    if (messages && !isLoading && !isFetching) {
      setDisplayedMessages(messages);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [messages, isLoading, isFetching]);

  const handleSendMessage = async (
    newMessage: string,
    userId: number,
    userPhotoUrl: string | null
  ) => {
    const tempMessage: MessageType = {
      id: Date.now(),
      text: newMessage,
      creationTime: new Date().toISOString(),
      userId: userId,
      chatId: chatId,
      userPhotoUrl: userPhotoUrl,
    };
    setDisplayedMessages((prev) => [...prev, tempMessage]);
    scrollToBottom();
  };
  const handleSendFile = async (
    newFile: string,
    userId: number,
    userPhotoUrl: string | null
  ) => {
    const tempMessage: MessageType = {
      id: Date.now(),
      fileUrl: newFile,
      creationTime: new Date().toISOString(),
      userId: userId,
      chatId: chatId,
      userPhotoUrl: userPhotoUrl,
    };
    setDisplayedMessages((prev) => [...prev, tempMessage]);
    scrollToBottom();
  };

  if (isLoading || (isFetching && displayedMessages.length === 0)) {
    return (
      <Box
        sx={{
          paddingTop: "15%",
        }}
      >
        <CommonPreloader sx={{ color: "#e5ff46" }} />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  return (
    <Box className={style.blockWrapper}>
      {messages ? <LastMessageDate messages={messages} /> : null}

      <Box className={style.dialogueWrapper} ref={dialogueWrapperRef}>
        {displayedMessages.map((message) => (
          <DialogueMessage message={message} key={message.id} />
        ))}
      </Box>
      <DialogueInput
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        chatId={chatId}
      />
    </Box>
  );
};

export default Dialogue;
