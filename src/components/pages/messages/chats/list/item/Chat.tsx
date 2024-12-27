import { FC } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { ChatData } from "@/components";
import { ChatType } from "@/types/messages/chats";
import style from "./Chat.module.scss";

const Chat: FC<ChatType> = ({
  userData,
  lastMessage,
  lastMessageDate,
  selectedChatId,
  chatId,
}) => {
  return (
    <Box className={style.blockWrapper}>
      <Image
        alt=""
        src={userData.photoUrl || "/images/user.png"}
        width={72}
        height={72}
        className={style.image}
      />
      <Box className={style.textWrapper}>
        <p className={style.title}>{userData.fullName || "anonym"}:</p>
        <p className={style.text}>{lastMessage}</p>
      </Box>
      <ChatData
        lastMessageDate={lastMessageDate}
        selectedChatId={selectedChatId}
        chatId={chatId}
      />
    </Box>
  );
};

export default Chat;
