"use client";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import {
  ChatsBlock,
  MessagesBlock,
  BlockUserWindow,
  ComplaintWindow,
  CommonIcon,
} from "@/components";
import { useGetMessagesByChatIdQuery } from "@/redux/messages/chatApi";
import { RootState } from "@/redux/store";

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
    <Box
      sx={{
        padding: "24px 20px 0px",
        marginBottom: "-54px",
        "@media (min-width: 768px)": {
          minHeight: "calc(100vh - 141px - 162px)",
          padding: "0px",
          marginBottom: "0px",
        },
        "@media screen and (min-width: 1024px)": {
          minHeight: "calc(100vh - 181px - 444px)",
        },
        "@media (min-width: 1440px)": {
          padding: "20px 0px",
          marginBottom: "0px",
        },
      }}
    >
      <Typography
        component="h1"
        sx={{
          display: "none",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "16px",
          fontSize: "var(--f-size-h4)",
          "@media (min-width: 768px)": {
            display: "block",
            padding: "0px 60px 31px",
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "1.2",
          },
        }}
      >
        Повідомлення
      </Typography>
      <Box
        sx={{
          display: "block",
          "@media (min-width: 768px)": {
            display: "none",
          },
        }}
      >
        <CommonIcon id="new-arrow-left" width="20" height="20" />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "16px 0px 0px",
          "@media (min-width: 1024px)": {
            columnGap: "15px",
            height: "550px",
            padding: "0px 20px",
          },
          "@media (min-width: 1440px)": {
            height: "720px",
            margin: "26px 0px 0px",
            padding: "0px 60px",
            columnGap: "30px",
          },
        }}
      >
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
    </Box>
  );
};

export default MessagesWrapper;
