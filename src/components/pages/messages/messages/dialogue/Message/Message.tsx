import { FC } from "react";
import { Box } from "@mui/material";
import {MessageType} from "@/types/messages/messages"
import style from "./Message.module.scss";

type MessageComponentType = {
    message: MessageType;
};

const Message: FC<MessageComponentType> = ({message}) => {
    return (
        <Box className={style.wrapper} key={message.id}>{message.text}</Box>
    );
};

export default Message;
