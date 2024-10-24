"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { CommonIcon, CommonInput } from "@/components";
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
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  if (!messages) {
    return <div>No messages found.</div>;
  }

  return (
    <>
      {/* {isFetching && <div>Updating...</div>} */}
      {displayedMessages.map((message) => (
        <div key={message.id}>{message.text}</div> // Adjust based on your message structure
      ))}
    </>
  );

  // console.log(isLoading === true ? "isLoading" : messages);

  // return (
  //   <Box className={style.blockWrapper}>
  //     <Box className={style.dateWrapper}>
  //       <Box className={style.date}>20 трав 2024</Box>
  //     </Box>

  //     {/* <Box className={style.dialogue}>
  //       <EmptyDialogueMessage />
  //     </Box> */}

  //     <Box className={style.inputBlockWrapper}>
  //       <Box className={style.inputIconsWrapper}>
  //         <CommonIcon
  //           id="picture"
  //           className={style.iconPic}
  //           // onClick={handleIconHeartClick}
  //         />
  //         <CommonIcon
  //           id="paper-clip"
  //           className={style.iconClip}
  //           // onClick={handleIconHeartClick}
  //         />
  //       </Box>
  //       {/* <Box className={style.inputWrapper}> */}
  //       {/* <CommonInput
  //           typeTitle="inputNewMessageValue"
  //           typeInput="text"
  //           value={inputNewMessageValue}
  //           setValue={(e) => setInputNewMessageValue(e.target.value)}
  //           placeholder="Напишіть повідомлення..."
  //           className={style.input}
  //         /> */}
  //       <TextField
  //         multiline
  //         maxRows={4}
  //         fullWidth
  //         className={style.input}
  //         placeholder="напишіть повідомлення..."
  //       />
  //       {/* </Box> */}
  //       <Box className={style.sendIconWrapper}>
  //         <CommonIcon
  //           id="message-send"
  //           className={style.iconSend}
  //           // onClick={handleIconHeartClick}
  //         />
  //       </Box>
  //     </Box>
  //   </Box>
  // );
};

export default Dialogue;
