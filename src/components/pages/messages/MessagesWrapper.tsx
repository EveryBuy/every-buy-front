import { FC } from "react";
import { Box } from "@mui/material";
import { MessageListBlock, DialogueBlock } from "@/components";
import styles from "./MessagesWrapper.module.scss";

const MessagesWrapper: FC = () => {
  return (
    <>
      <h1 className="title">Повідомлення</h1>
      <Box className={styles.wrapper}>
        <MessageListBlock />
        <DialogueBlock />
      </Box>
    </>
  );
};

export default MessagesWrapper;
