"use client";

import { FC, useState, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { CommonIcon } from "@/components";
import {
  useAddMessageToChatMutation,
  useUploadFileToChatMutation,
} from "@/redux/messages/chatApi";
import style from "./DialogueInput.module.scss";

type DialogueInputProps = {
  onSendMessage: (
    newMessage: string,
    userId: number,
    userPhotoUrl: string | null
  ) => void;
  onSendFile: (
    newFile: string,
    userId: number,
    userPhotoUrl: string | null
  ) => void;
  chatId: number | null;
};

const DialogueInput: FC<DialogueInputProps> = ({
  onSendMessage,
  onSendFile,
  chatId,
}) => {
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addMessageToChat] = useAddMessageToChatMutation();
  const [uploadFileToChat] = useUploadFileToChatMutation();

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
          const { userId, userPhotoUrl } = response.data;
          console.log("Message sent:", message);
          onSendMessage(message, userId, userPhotoUrl);
        }
      } catch (error) {
        console.error("Помилка надсилання повідомлення:", error);
      }
      // onSendMessage(message);
      setMessage("");
    } else {
      console.log("Cannot send an empty message");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleIconClick = (type: "picture" | "document") => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "picture" ? "image/*" : "*/*";
      fileInputRef.current.click();
    }
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && chatId) {
      try {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });

        const response = await uploadFileToChat({ chatId, formData }).unwrap();
        if (response) {
          const { userId, userPhotoUrl, fileUrl } = response[0];
          onSendFile(fileUrl, userId, userPhotoUrl);
        }
      } catch (error) {
        console.error("Помилка завантаження файлу:", error);
      }
    }
  };

  return (
    <Box className={style.blockBackground}>
      <Box className={style.inputBlockWrapper}>
        <Box className={style.inputIconsWrapper}>
          <CommonIcon
            id="picture"
            className={style.iconPic}
            onClick={() => handleIconClick("picture")}
          />
          <CommonIcon
            id="paper-clip"
            className={style.iconClip}
            onClick={() => handleIconClick("document")}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUploadFile}
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
          onKeyDown={handleKeyDown}
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
