"use client";
import { FC } from "react";
import { Box } from "@mui/material";
import { Buttons, Icons, CommonIcon } from "@/components";
import style from "../ChatsBlock.module.scss";
import { ButtonsIconBlockType } from "@/types/messages/chats";

const ButtonsIconBlock: FC<ButtonsIconBlockType> = ({
  activeButton,
  setActiveButton,
  isSelected,
  setSelected,
  isFolderSelected,
  setFolderSelected,
}) => {
  const handleButtonClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };
  const handleIconHeartClick = () => {
    setSelected((prev) => !prev);
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
      sx={{
        height: "67px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e7e6e6",
        borderRadius: "8px",
        padding: "12px",
        "@media screen and (min-width: 1024px)": {
          height: "65px",
          borderRadius: "10px",
          padding: "0px 10px",
        },
        "@media screen and (min-width: 1440px)": {
          height: "81px",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      }}
    >
      {isSelected ? (
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              columnGap: "16px",
              width: "80px",
              "@media screen and (min-width: 1024px)": {
                width: "55px",
                columnGap: "0px",
              },
              "@media screen and (min-width: 1440px)": {
                width: "80px",
              },
            }}
          >
            <Icons
              isItTopBlock={true}
              statusHeartHandler={handleIconHeartClick}
              statusFolderHandler={handleIconFolderClick}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ButtonsIconBlock;
