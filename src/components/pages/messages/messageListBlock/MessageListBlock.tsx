"use client";
import { FC, useState } from "react";
import { Box } from "@mui/material";
import { ListMessages, Buttons, Icons, CommonIcon } from "@/components";
// import MessagesBuyType from "@/types/messages/messagesBuy";
import style from "./MessageListBlock.module.scss";

// interface MessageListBlockType {
//   data: MessagesBuyType[];
// }

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
const mockSavedBuyMessages = [
  {
    id: 1,
    picture: "/images/user.png",
    alt: "icon",
    title: "Вікторія",
    text: "Деякий текст від Вікторії",
  },
  {
    id: 2,
    picture: "/images/user.png",
    alt: "icon",
    title: "Костянтин",
    text: "Деякий текст від Костянтина",
  },
];
const mockSavedSellMessages = [
  {
    id: 1,
    picture: "/images/user.png",
    alt: "icon",
    title: "Марина",
    text: "Деякий текст від Марини",
  },
];
const mockArchBuyMessages = [
  {
    id: 1,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ярослав",
    text: "Деякий текст від Ярослава",
  },
  {
    id: 2,
    picture: "/images/user.png",
    alt: "icon",
    title: "Ігор",
    text: "Деякий текст від Ігора",
  },
];
const mockArchSellMessages = [
  {
    id: 1,
    picture: "/images/user.png",
    alt: "icon",
    title: "Нюня",
    text: "Деякий текст від Нюні",
  },
  {
    id: 2,
    picture: "/images/user.png",
    alt: "icon",
    title: "Зюня",
    text: "Деякий текст від Зюні",
  },
  {
    id: 3,
    picture: "/images/user.png",
    alt: "icon",
    title: "Тяпа",
    text: "Деякий текст від Тяпи",
  },
];

const MessageListBlock: FC = () => {
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

  const messages =
    activeButton === 1 &&
    isHeartSelected === false &&
    isFolderSelected === false
      ? mockMessagesDataBuy
      : activeButton === 1 &&
        isHeartSelected === true &&
        isFolderSelected === false
      ? mockSavedBuyMessages
      : activeButton === 2 &&
        isHeartSelected === false &&
        isFolderSelected === false
      ? mockMessagesDataSell
      : activeButton === 2 &&
        isHeartSelected === true &&
        isFolderSelected === false
      ? mockArchBuyMessages
      : activeButton === 2 &&
        isHeartSelected === false &&
        isFolderSelected === true
      ? mockArchSellMessages
      : mockSavedSellMessages;

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
        <ListMessages messages={messages} />
      </Box>
    </Box>
  );
};

export default MessageListBlock;
