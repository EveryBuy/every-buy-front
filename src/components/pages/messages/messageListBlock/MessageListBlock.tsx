"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { List, Buttons, Icons } from "@/components";
import style from "./MessageListBlock.module.scss";

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

  return (
    <Box className={style.blockWrapper}>
      <Box className={style.buttonsWrapper}>
        <Buttons
          typeHandle={handleClick}
          styleButton={getButtonStyle}
          typeButtonBuyStatus={activeButton === 1}
          typeButtonSellStatus={activeButton === 2}
        />
        <Icons />
      </Box>
      <Box className={style.listWrapper}>
        <List />
      </Box>
    </Box>
  );
};

export default MessageListBlock;
