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
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
  chat,
}) => {
  const numberOfUnreadMessages = chat?.unreadMessagesCount || 0;
  console.log(chat);

  return (
    <Box className={style.blockWrapper}>
      <div className={style.imageWrapper}>
        <Image
          alt=""
          src={userData.photoUrl || "/images/user.png"}
          width={72}
          height={72}
          className={style.image}
        />
        {numberOfUnreadMessages > 0 ? (
          <Box className={style.point}>
            <p className={style.number}>{numberOfUnreadMessages}</p>
          </Box>
        ) : null}
        {chat.anotherUserBlocked || chat.currentlyUserBlocked ? (
          // <div className={style.triangleWrapper}>
          <div className={style.triangle}></div>
        ) : // </div>
        null}
      </div>
      <Box className={style.textWrapper}>
        <p className={style.title}>{userData.fullName || "anonym"}:</p>
        <p className={style.text}>{lastMessage}</p>
      </Box>
      <ChatData
        lastMessageDate={lastMessageDate}
        selectedChatId={selectedChatId}
        chatId={chatId}
        isHeartSelected={isHeartSelected}
        setHeartSelected={setHeartSelected}
        isArchived={isArchived}
        setArchived={setArchived}
        chat={chat}
      />
    </Box>
  );
};

export default Chat;
