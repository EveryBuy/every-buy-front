import { FC } from "react";
import { Box } from "@mui/material";
import { ChatsBlock, MessagesBlock } from "@/components";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  return (
    <>
      <h1 className="title">Повідомлення</h1>
      <Box className={styles.wrapper}>
        <ChatsBlock />
        <MessagesBlock />
      </Box>
    </>
  );
};

export default MessagesWrapper;
