"use client";

import { FC, useState } from "react";
import { Box, TextField } from "@mui/material";
import { CommonIcon } from "@/components";
import { useAddMessageToChatMutation } from "@/redux/messages/chatApi";
import style from "./DialogueInput.module.scss";

type DialogueInputProps = {
  onSendMessage: (
    newMessage: string,
    userId: number,
    userPhotoUrl: string | null
  ) => void;
  chatId: number | null;
};

const DialogueInput: FC<DialogueInputProps> = ({ onSendMessage, chatId }) => {
  const [message, setMessage] = useState<string>("");
  const [addMessageToChat] = useAddMessageToChatMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleSendMessage = async () => {
    if (message.trim() && chatId) {
      //
      try {
        const response = await addMessageToChat({
          text: message,
          chatId: chatId,
        });
        if (response.data) {
          const userId = response.data.userId;
          const userPhotoUrl = response.data.userPhotoUrl;
          console.log("Message sent:", message);
          onSendMessage(message, userId, userPhotoUrl);
        }
      } catch (error) {
        console.error("Помилка надсилання повідомлення:", error);
      }
      //
      // console.log("Message sent:", message);
      // onSendMessage(message);
      setMessage("");
    } else {
      console.log("Cannot send an empty message");
    }
  };

  return (
    <Box className={style.blockBackground}>
      <Box className={style.inputBlockWrapper}>
        <Box className={style.inputIconsWrapper}>
          <CommonIcon
            id="picture"
            className={style.iconPic}
            // onClick={handleIconHeartClick}
          />
          <CommonIcon
            id="paper-clip"
            className={style.iconClip}
            // onClick={handleIconHeartClick}
          />
        </Box>
        {/* <Box className={style.inputWrapper}> */}
        <TextField
          multiline
          maxRows={4}
          fullWidth
          className={style.input}
          placeholder="напишіть повідомлення..."
          value={message}
          onChange={handleInputChange}
        />
        {/* </Box> */}
        <Box className={style.sendIconWrapper}>
          <CommonIcon
            id="message-send"
            className={style.iconSend}
            onClick={handleSendMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DialogueInput;
