"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { CommonIcon, CommonInput, CommonPreloader, Message } from "@/components";
import {formatMessageDate} from "@/utils/formatMessageDate";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import { ChatMessagesType } from "@/types/messages/messages";
import style from "./Dialogue.module.scss";

type DialogueType = {
  chatId: number | null;
  // setSelectedChatId: (chatId: number | null) => void;
};

const EmptyDialogueMessage: FC = () => {
  return (
    <Box className={style.noticeWrapper}>
      <p>Повідомлень ще немає...</p>
      <p>Відправте своє повідомлення, і воно відобразиться тут.</p>
      <Image
        alt=""
        src="/images/letter.png"
        width={105}
        height={98}
        className={style.picture}
      />
    </Box>
  );
};

const Dialogue: FC<DialogueType> = ({ chatId }) => {
  // const [inputNewMessageValue, setInputNewMessageValue] = useState<string>("");
  // const { data: messages } = useGetMessagesByChatIdQuery(chatId);
  const [displayedMessages, setDisplayedMessages] = useState<
    ChatMessagesType[]
  >([]);
  // const [isTransitioning, setIsTransitioning] = useState(false);
  // !!!
  const {
    data: messages,
    error,
    isLoading,
    isFetching,
  } = useGetMessagesByChatIdQuery(chatId ?? skipToken, {
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
    return <CommonPreloader sx={{ color: '#9d9d9d' }}/>;
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  return (
    <Box className={style.blockWrapper}>
      <Box className={style.dateWrapper}>
        {messages ? <Box className={style.date}>{formatMessageDate(messages[messages.length - 1].
          creationTime)}</Box> : "data not found"}
      </Box>

      <Box className={style.dialogue}>
        {!messages ? <EmptyDialogueMessage /> : displayedMessages.map((message) => (
            <Message message={message}/>
              // <div key={message.id}>{message.text}</div>
          ))}
      </Box>

      <Box className={style.inputBlockWrapper}>
        <Box className={style.inputIconsWrapper}>
          <CommonIcon
            id="picture"
            className={style.iconPic}
            // onClick={handleIconHeartClick}
          />
          <CommonIcon
            id="paper-clip"
            className={style.iconClip}
            // onClick={handleIconHeartClick}
          />
        </Box>
        {/* <Box className={style.inputWrapper}> */}
        <TextField
          multiline
          maxRows={4}
          fullWidth
          className={style.input}
          placeholder="напишіть повідомлення..."
        />
        {/* </Box> */}
        <Box className={style.sendIconWrapper}>
          <CommonIcon
            id="message-send"
            className={style.iconSend}
            // onClick={handleIconHeartClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dialogue;
