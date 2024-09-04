"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { ListMessages, Buttons, Icons } from "@/components";
import style from "./MessageListBlock.module.scss";

const mockMessagesDataBuy = [
  {
    id: 1,
    picture: "/images/user.png",
    alt: "icon",
    title: "Віктор",
    text: "Деякий текст від Віктора",
  },
  {
    id: 2,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ксенія",
    text: "Деякий текст від Ксенії є занадто великим",
  },
  {
    id: 3,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ви",
    text: "Деякий текст також завеликий",
  },
  {
    id: 4,
    picture: "/images/user.png",
    alt: "icon",
    title: "Віктор",
    text: "Деякий текст від Віктора",
  },
  {
    id: 5,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ксенія",
    text: "Деякий текст від Ксенії",
  },
  {
    id: 6,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ви",
    text: "Деякий текст",
  },
  {
    id: 7,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ксенія",
    text: "Деякий текст від Ксенії",
  },
  {
    id: 8,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ви",
    text: "Деякий текст",
  },
];
const mockMessagesDataSell = [
  {
    id: 1,
    picture: "/images/user.png",
    alt: "icon",
    title: "Вікторія",
    text: "Деякий текст від Віктора",
  },
  {
    id: 2,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ксеній",
    text: "Деякий текст від Ксенії є занадто великим",
  },
  {
    id: 3,
    picture: "/images/user.png",
    alt: "icon",
    title: "Я",
    text: "Деякий текст також завеликий",
  },
  {
    id: 4,
    picture: "/images/user.png",
    alt: "icon",
    title: "Вікторія",
    text: "Деякий текст від Віктора",
  },
  {
    id: 5,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ксеній",
    text: "Деякий текст від Ксенії",
  },
  {
    id: 6,
    picture: "/images/user.png",
    alt: "icon",
    title: "Я",
    text: "Деякий текст",
  },
  {
    id: 7,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ксеній",
    text: "Деякий текст від Ксенії",
  },
  {
    id: 8,
    picture: "/images/user.png",
    alt: "icon",
    title: "я",
    text: "Деякий текст",
  },
];

const MessageListBlock = () => {
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const handleClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  const getButtonStyle = (buttonId: number) => {
    return {
      borderBottom: activeButton === buttonId ? "3px solid #000000" : "",
    };
  };

  const messages =
    activeButton === 1 ? mockMessagesDataBuy : mockMessagesDataSell;

  return (
    <Box className={style.blockWrapper}>
      <Box className={style.buttonsWrapper}>
        <Buttons
          typeHandle={handleClick}
          styleButton={getButtonStyle}
          typeButtonBuyStatus={activeButton === 1}
          typeButtonSellStatus={activeButton === 2}
        />
        <Box className={style.iconsWrapper}>
          <Icons />
        </Box>
      </Box>
      <Box className={style.listWrapper}>
        <ListMessages messages={messages} />
      </Box>
    </Box>
  );
};

export default MessageListBlock;
