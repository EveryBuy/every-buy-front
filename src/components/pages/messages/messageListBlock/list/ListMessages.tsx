"use client";

import { FC } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ItemMessage } from "@/components";
import style from "./ListMessages.module.scss";

interface ListMessagesType {
  messages: MessageType[];
}

interface MessageType {
  id: number;
  picture: string;
  alt: string;
  title: string;
  text: string;
}

// const StyledBox = styled("div")(({ theme }) => ({
const StyledBox = styled("div")(() => ({
  height: "635px",
  overflowY: "auto",
  padding: "10px 0px",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e5ff46",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#b3c638",
    // backgroundColor: theme.palette.primary.dark,
  },
}));

const ListMessages: FC<ListMessagesType> = ({ messages }) => {
  return (
    <StyledBox className={style.listWrapper}>
      {messages.map(({ id, picture, title, text, alt }) => (
        <Box sx={{ borderBottom: "solid 1px gray" }} key={id}>
          <ItemMessage picture={picture} title={title} text={text} alt={alt} />
        </Box>
      ))}
    </StyledBox>
  );
};

export default ListMessages;
