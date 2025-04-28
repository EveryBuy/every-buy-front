"use client";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  ChatsBlock,
  MessagesBlock,
  DeleteChatWindow,
  BlockUserWindow,
} from "@/components";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import { RootState } from "@/redux/store";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  const [isDeleteWindowVisible, setDeleteWindowVisible] = useState(false);
  const [isBlockWindowVisible, setBlockWindowVisible] = useState(false);
  // for mobile version
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const newChatId = useSelector((state: RootState) => state.messages.chatId);
  const activeChatId = selectedChatId ?? newChatId;
  // useGetMessagesByChatIdQuery(selectedChatId as number, {
  //   skip: activeChatId === null,
  // });
  useGetMessagesByChatIdQuery(activeChatId as number, {
    skip: !activeChatId,
  });

  const deleteChatWindowHandle = () => {
    setDeleteWindowVisible((prev) => !prev);
  };
  const blockUserWindowHandle = () => {
    setBlockWindowVisible((prev) => !prev);
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={`title ${styles.headline}`}>Повідомлення</h1>
      <Box className={styles.chatBlockWrapper}>
        <ChatsBlock
          activeChatId={activeChatId}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
        />
        <MessagesBlock
          // chatId={selectedChatId}
          chatId={activeChatId}
          setSelectedChatId={setSelectedChatId} // for mobile version
          deleteChatWindowHandle={deleteChatWindowHandle}
          blockUserWindowHandle={blockUserWindowHandle}
        />
        {isDeleteWindowVisible && (
          <DeleteChatWindow deleteChatWindowHandle={deleteChatWindowHandle} />
        )}
        {isBlockWindowVisible && (
          <BlockUserWindow
            blockUserWindowHandle={blockUserWindowHandle}
            setBlockWindowVisible={setBlockWindowVisible}
          />
        )}
      </Box>
    </div>
  );
};

export default MessagesWrapper;
