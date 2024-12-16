"use client";
import { FC, useState } from "react";
import { Box } from "@mui/material";
import { ChatsList, Buttons, Icons, CommonIcon } from "@/components";
<<<<<<< HEAD
import { useGetChatsQuery } from "@/redux/messages/chatApi";
=======
import {
  useGetBuyChatsQuery,
  useGetSellChatsQuery,
} from "@/redux/messages/chatApi";
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
import style from "./ChatsBlock.module.scss";

type MessageListBlockType = {
  onclick: (selectedChatId: number) => void;
  selectedChatId: number | null;
};

const MessageListBlock: FC<MessageListBlockType> = ({
  onclick,
  selectedChatId,
}) => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [isHeartSelected, setHeardSelected] = useState<boolean>(false);
  const [isFolderSelected, setFolderSelected] = useState<boolean>(false);
  const {
    data: buyChats,
    isLoading: isBuyChatsLoading,
    isError: isBuyChatsError,
  } = useGetBuyChatsQuery();
  const {
    data: sellChats,
    isLoading: isSellChatsLoading,
    isError: isSellChatsError,
  } = useGetSellChatsQuery();

  const chats = activeButton === 1 ? buyChats : sellChats;

  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };
  const handleIconHeartClick = () => {
    setHeardSelected((prev) => !prev);
  };
  const handleIconFolderClick = () => {
    setFolderSelected((prev) => !prev);
  };

  const getButtonStyle = (buttonId: number) => {
    return {
      borderBottom: activeButton === buttonId ? "3px solid #000000" : "",
    };
  };

  return (
    <Box
      className={
        selectedChatId
          ? `${style.blockWrapper} ${style.hidden}`
          : style.blockWrapper
      }
    >
      <Box className={style.buttonsWrapper}>
        {isHeartSelected ? (
          <Box className={style.savedMessagesHeaderBlock}>
            <Box className={style.text}>
              <CommonIcon
                id="message-left-arrow"
                className={style.arrow}
                onClick={handleIconHeartClick}
              />
              <p>Збережені повідомлення</p>
            </Box>
            <CommonIcon id="icon-heart-selected" className={style.iconHeart} />
          </Box>
        ) : isFolderSelected ? (
          <Box className={style.savedMessagesHeaderBlock}>
            <Box className={style.text}>
              <CommonIcon
                id="message-left-arrow"
                className={style.arrow}
                onClick={handleIconFolderClick}
              />
              <p>Архівовані повідомлення</p>
            </Box>
            <CommonIcon id="folder" className={style.iconFolder} />
          </Box>
        ) : (
          <>
            <Buttons
              typeHandle={handleButtonClick}
              styleButton={getButtonStyle}
              typeButtonBuyStatus={activeButton === 1}
              typeButtonSellStatus={activeButton === 2}
            />
            <Box className={style.iconsWrapper}>
              <Icons
                // status={isHeartSelected}
                statusHeartHandler={handleIconHeartClick}
                statusFolderHandler={handleIconFolderClick}
              />
            </Box>
          </>
        )}
      </Box>
<<<<<<< HEAD
      <Box className={style.listWrapper}>
        <ChatsList chats={chats} onclick={onclick} />
      </Box>
=======
      {/* <Box className={style.listWrapper}> */}
      <ChatsList chats={chats} onclick={onclick} />
      {/* </Box> */}
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
    </Box>
  );
};

export default MessageListBlock;
