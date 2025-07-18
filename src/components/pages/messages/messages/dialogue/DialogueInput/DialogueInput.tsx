"use client";

import { FC, useState, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { CommonIcon } from "@/components";
import {
  useAddMessageToChatMutation,
  useUploadFileToChatMutation,
  useUnblockUserMutation,
} from "@/redux/messages/chatApi";
import style from "./DialogueInput.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  isCompanionBlocked: boolean | null;
  isUserBlockedByCompanion: boolean | null;
};

const DialogueInput: FC<DialogueInputProps> = ({
  onSendMessage,
  onSendFile,
  chatId,
  isCompanionBlocked,
  isUserBlockedByCompanion,
}) => {
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addMessageToChat] = useAddMessageToChatMutation();
  const [uploadFileToChat] = useUploadFileToChatMutation();
  const [unblockUser] = useUnblockUserMutation();

  // blocking user's chat
  // const isCompanionBlocked = useSelector((state: RootState) =>
  //   state.messages?.chat ? state.messages.chat.anotherUserBlocked : null
  // );
  // const isUserBlockedByCompanion = useSelector((state: RootState) =>
  //   state.messages?.chat ? state.messages.chat.currentlyUserBlocked : null
  // );
  // const response = useSelector((state: RootState) =>
  //   state.messages?.chat ? state.messages.chat : null
  // );

  const companionId = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.userData?.userId : null
  );

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

  const unblockUserHandler = async (
    userId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    // setBlockWindowVisible?.((prev) => !prev);
    try {
      if (userId) {
        const response = await unblockUser({ userId: userId }).unwrap();
        console.log("response", response);
        if (response === null) {
          console.log("The user is unblocked!");
        }
      }
    } catch (error) {
      // setBlockWindowVisible?.((prev) => !prev);
      console.error("Failed to unblock the user:", error);
    }
  };

  const dialogInput = isCompanionBlocked ? (
    <Box className={`${style.blockBackground} ${style.blockMessage}`}>
      <p>
        Ви заблокували користувача. Щоб надсилати та отримувати повідомлення
        спершу розблокуйте його
      </p>
      {/* @ts-ignore */}
      <p onClick={(e) => unblockUserHandler(companionId as number, e)}>
        Розблокувати
      </p>
    </Box>
  ) : isUserBlockedByCompanion ? (
    <Box
      className={`${style.blockBackground} ${style.blockMessage} ${style.chatBlockedByCompanion}`}
    >
      <p>
        Вибачте, користувач вас заблокував. Тепер ви не можете надсилати йому
        повідомлення
      </p>
    </Box>
  ) : (
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

  return <>{dialogInput}</>;
};

export default DialogueInput;
