import { FC } from "react";
import { Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import { selectUser } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { formatMessageTime } from "@/utils/formatMessageDate";
import { MessageType } from "@/types/messages/messages";
import style from "./DialogueMessage.module.scss";

type MessageComponentType = {
  message: MessageType;
};

const DialogueMessages: FC<MessageComponentType> = ({ message }) => {
  console.log(message);
  const user = useAppSelector(selectUser);
  // if (user) {
  //   console.log(user.userId);
  // }
  const messagePositionStyle =
    user.userId === message.userId ? "right" : "left";
  const messageBgStyle = user.userId === message.userId ? "#FFF" : "#F5FFB6";
  const picture = message.userPhotoUrl ? (
    <Box className={style.picture}>
      <Image src={`${message.userPhotoUrl}`} width={48} height={48} alt="" />
    </Box>
  ) : (
    <Box className={style.noPicture}>
      <CameraAltIcon />
    </Box>
  );

  return (
    <Box
      className={style.wrapper}
      sx={{ justifySelf: `${messagePositionStyle}` }}
    >
      {picture}
      <Box
        className={style.textWrapper}
        sx={{ backgroundColor: `${messageBgStyle}` }}
      >
        <Typography className={style.text}>{message.text}</Typography>
        <Typography className={style.time}>
          {formatMessageTime(message.creationTime)}
        </Typography>
      </Box>
    </Box>
  );
};

export default DialogueMessages;
