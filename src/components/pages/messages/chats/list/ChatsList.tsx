"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { Chat, CommonPreloader } from "@/components";
import {
  ChatType,
  FavoritesChatType,
  ArchivedChatType,
} from "@/types/messages/chats";
import style from "./ChatsList.module.scss";

interface ChatsListType {
  chats?: ChatType[] | FavoritesChatType[] | ArchivedChatType[] | undefined;
  setSelectedChatId: (chatId: number) => void;
  selectedChatId: number | null;
  isBuyChatsLoading: boolean;
  isSellChatsLoading: boolean;
}

const ChatsList: FC<ChatsListType> = ({
  chats,
  setSelectedChatId,
  isBuyChatsLoading,
  isSellChatsLoading,
}) => {
  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
  };
  // I still need it
  console.log(chats);
  return (
    <Box>
      {isBuyChatsLoading || isSellChatsLoading ? (
        <Box
          className={style.listWrapper}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CommonPreloader sx={{ color: "#9d9d9d" }} />
        </Box>
      ) : chats && chats.length > 0 ? (
        <Box className={style.listWrapper}>
          {chats.map(({ chatId, userData, lastMessage, lastMessageDate }) => (
            <Box
              key={chatId}
              className={style.listItem}
              onClick={() => {
                if (chatId) {
                  handleChatClick(chatId);
                }
              }}
            >
              <Chat
                lastMessage={lastMessage}
                userData={userData}
                lastMessageDate={lastMessageDate}
                chatId={chatId}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          className={style.listWrapper}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#9d9d9d",
          }}
        >
          You have no messages yet
        </Box>
      )}
    </Box>
  );
  //   <Box>
  //     {chats ? (
  //       chats.length > 0 ? (
  //         <Box className={style.listWrapper}>
  //           {chats.map(({ chatId, userData, lastMessage, lastMessageDate }) => (
  //             <Box
  //               key={chatId}
  //               className={style.listItem}
  //               onClick={() => {
  //                 if (chatId) {
  //                   handleChatClick(chatId);
  //                 }
  //               }}
  //             >
  //               <Chat
  //                 lastMessage={lastMessage}
  //                 userData={userData}
  //                 lastMessageDate={lastMessageDate}
  //                 chatId={chatId}
  //               />
  //             </Box>
  //           ))}
  //         </Box>
  //       ) : (
  //         <Box
  //           className={style.listWrapper}
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             color: "#9d9d9d",
  //           }}
  //         >
  //           You have no messages yet
  //         </Box>
  //       )
  //     ) : (
  //       <Box
  //         className={style.listWrapper}
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <CommonPreloader sx={{ color: "#9d9d9d" }} />
  //       </Box>
  //     )}
  //   </Box>
  // );
};

export default ChatsList;
