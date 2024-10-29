"use client";
import { FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import {ChatsList, Buttons, Icons, CommonIcon} from "@/components";
import {
  useGetChatsQuery,
  useGetMessagesByChatIdQuery,
} from "@/redux/messages/chatApi";
import style from "./ChatsBlock.module.scss";

type MessageListBlockType = {
  onclick: (selectedChatId: number) => void;
};

const MessageListBlock: FC<MessageListBlockType> = ({ onclick }) => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [isHeartSelected, setHeardSelected] = useState<boolean>(false);
  const [isFolderSelected, setFolderSelected] = useState<boolean>(false);
  const { data: chats, isLoading, isError } = useGetChatsQuery();

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
    <Box className={style.blockWrapper}>
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
      <Box className={style.listWrapper}>
        <ChatsList chats={chats} onclick={onclick} />
      </Box>
    </Box>
  );
};

export default MessageListBlock;
