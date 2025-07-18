"use client";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  ChatsBlock,
  MessagesBlock,
  BlockUserWindow,
  ComplaintWindow,
} from "@/components";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import { RootState } from "@/redux/store";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  const [isComplaintWindowVisible, setComplaintWindowVisible] = useState(false);
  const [isBlockWindowVisible, setBlockWindowVisible] = useState(false);
  // for mobile version
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  // for mobile version
  const [isHeartSelected, setHeartSelected] = useState(false);
  const [isArchived, setArchived] = useState(false);
  const newChatId = useSelector((state: RootState) => state.messages.chatId);
  const activeChatId = selectedChatId ?? newChatId;
  const isCompanionBlocked = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.anotherUserBlocked : null
  );
  const isUserBlockedByCompanion = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.currentlyUserBlocked : null
  );

  useGetMessagesByChatIdQuery(activeChatId as number, {
    skip: !activeChatId,
  });
  const blockUserWindowHandle = () => {
    setBlockWindowVisible((prev) => !prev);
  };
  const complaintWindowHandle = () => {
    setComplaintWindowVisible((prev) => !prev);
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={`title ${styles.headline}`}>Повідомлення</h1>
      <Box className={styles.chatBlockWrapper}>
        <ChatsBlock
          activeChatId={activeChatId}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          isHeartSelected={isHeartSelected}
          setHeartSelected={setHeartSelected}
          isArchived={isArchived}
          setArchived={setArchived}
        />
        <MessagesBlock
          chatId={activeChatId}
          setSelectedChatId={setSelectedChatId} // for mobile version
          blockUserWindowHandle={blockUserWindowHandle}
          complaintWindowHandle={complaintWindowHandle}
          isHeartSelected={isHeartSelected}
          setHeartSelected={setHeartSelected}
          isArchived={isArchived}
          setArchived={setArchived}
          isCompanionBlocked={isCompanionBlocked}
          isUserBlockedByCompanion={isUserBlockedByCompanion}
        />
        {isComplaintWindowVisible && (
          <ComplaintWindow
            complaintWindowHandle={complaintWindowHandle}
            setBlockWindowVisible={setComplaintWindowVisible}
          />
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
