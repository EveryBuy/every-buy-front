"use client";

import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  useGetChatQuery,
  useGetMessagesByChatIdQuery,
} from "@/redux/messages/chatApi";
import {
  Companion,
  Product,
  Dialogue,
  EmptyDialogueMessage,
  CommonPreloader,
} from "@/components";
import style from "./MessagesBlock.module.scss";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

type MessagesBlockType = {
  chatId: number | null;
  setSelectedChatId: (chatId: number | null) => void;
  blockUserWindowHandle: () => void;
  complaintWindowHandle: () => void;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
  isCompanionBlocked: boolean | null;
  isUserBlockedByCompanion: boolean | null;
};

const MessagesBlock: FC<MessagesBlockType> = ({
  chatId,
  setSelectedChatId,
  blockUserWindowHandle,
  complaintWindowHandle,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
  isCompanionBlocked,
  isUserBlockedByCompanion,
}) => {
  const [isDataReady, setIsDataReady] = useState(false);
  const { data: chatData, isLoading: isChatLoading } = useGetChatQuery(
    chatId as number,
    {
      skip: !chatId,
    }
  );
  const { data: messagesData, isLoading: isMessagesLoading } =
    useGetMessagesByChatIdQuery(chatId as number, {
      skip: !chatId,
    });
  // const isCompanionBlocked = useSelector((state: RootState) =>
  //   state.messages?.chat ? state.messages.chat.anotherUserBlocked : null
  // );
  // const isUserBlockedByCompanion = useSelector((state: RootState) =>
  //   state.messages?.chat ? state.messages.chat.currentlyUserBlocked : null
  // );

  useEffect(() => {
    setIsDataReady(false);
  }, [chatId]);

  useEffect(() => {
    if (
      chatData?.userData &&
      chatData?.shortAdvertisementInfo &&
      Array.isArray(messagesData)
    ) {
      setIsDataReady(true);
    }
  }, [chatData, messagesData]);

  if (!chatId) {
    return (
      <Box className={style.noMessagesBlockWrapper}>
        <EmptyDialogueMessage />
      </Box>
    );
  }
  if (!isDataReady || isChatLoading || isMessagesLoading) {
    return (
      <Box className={style.noMessagesBlockWrapper}>
        <CommonPreloader
          sx={{
            color: "#e5ff46",
            marginTop: "200px",
            "@media screen and (min-width: 768px)": { marginTop: "100px" },
            "@media screen and (min-width: 1024px)": { marginTop: "200px" },
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      className={
        chatId ? `${style.blockWrapper} ${style.visible}` : style.blockWrapper
      }
    >
      <Companion
        setSelectedChatId={setSelectedChatId}
        blockUserWindowHandle={blockUserWindowHandle}
        complaintWindowHandle={complaintWindowHandle}
        chatId={chatId}
        isHeartSelected={isHeartSelected}
        setHeartSelected={setHeartSelected}
        isArchived={isArchived}
        setArchived={setArchived}
        chatData={chatData}
        isCompanionBlocked={isCompanionBlocked}
        isUserBlockedByCompanion={isUserBlockedByCompanion}
      />
      <Product chatData={chatData} />
      <Dialogue
        chatId={chatId}
        isCompanionBlocked={isCompanionBlocked}
        isUserBlockedByCompanion={isUserBlockedByCompanion}
      />
    </Box>
  );
  //   <Box className={style.noMessagesBlockWrapper}>
  //     <EmptyDialogueMessage />
  //   </Box>
  // ) : !isDataReady ? (
  //   <Box className={style.noMessagesBlockWrapper}>
  //     <CommonPreloader sx={{ color: "#e5ff46" }} />
  //   </Box>
  // ) : (
  //   <Box className={style.blockWrapper}>
  //     {/* setSelectedChatId - for mobile version */}
  //     <Companion
  //       setSelectedChatId={setSelectedChatId}
  //       blockUserWindowHandle={blockUserWindowHandle}
  //       complaintWindowHandle={complaintWindowHandle}
  //       chatId={chatId}
  //       isHeartSelected={isHeartSelected}
  //       setHeartSelected={setHeartSelected}
  //       isArchived={isArchived}
  //       setArchived={setArchived}
  //       chatData={chatData}
  //     />

  //     <Product chatData={chatData} />
  //     <Dialogue chatId={chatId} />
  //   </Box>
  // );
};

export default MessagesBlock;
