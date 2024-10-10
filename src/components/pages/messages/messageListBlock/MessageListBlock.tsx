"use client";
import { FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ListMessages, Buttons, Icons, CommonIcon } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import {
  getAllChats,
  getAllMessagesById,
} from "../../../../redux/messages/operations";
import style from "./MessageListBlock.module.scss";

const useAppDispatch = () => useDispatch<AppDispatch>();

const MessageListBlock: FC = () => {
  const dispatch = useAppDispatch();
  const messages = useSelector((state: RootState) => state.messages.chats);
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [isHeartSelected, setHeardSelected] = useState<boolean>(false);
  const [isFolderSelected, setFolderSelected] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllChats());
        await dispatch(getAllMessagesById(10));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!messages) {
    return "Завантажується";
  }

  // !mock-data
  const mockMessages = [
    {
      chatId: 1,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 2,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 3,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 4,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 5,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 6,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 7,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
    {
      chatId: 8,
      lastMessage: "no messages yet",
      lastMessageDate: "none",
      userData: {
        userId: 111,
        fullName: "olesia",
        photoUrl: "",
      },
    },
  ];
  // !mock-data

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
        {/* <ListMessages messages={messages} /> */}
        <ListMessages messages={mockMessages} />
      </Box>
    </Box>
  );
};

export default MessageListBlock;
