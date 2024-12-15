import { FC } from "react";
import { Box, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/store";
import { formatMessageTime } from "@/utils/formatMessageDate";
import { MessageType } from "@/types/messages/messages";
import style from "./DialogueMessage.module.scss";

type MessageComponentType = {
  message: MessageType;
};

const DialogueMessages: FC<MessageComponentType> = ({ message }) => {
  const user = useAppSelector(selectUser);
  const messagePositionStyle =
    user.userId === message.userId ? "right" : "left";
  const messageBgStyle = user.userId === message.userId ? "#FFF" : "#F5FFB6";
  const picOrder = user.userId === message.userId ? "2" : "1";
  const textOrder = user.userId === message.userId ? "1" : "2";

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
      <Box sx={{ order: `${picOrder}` }}>{picture}</Box>
      <Box
        className={`${
          user.userId === message.userId
            ? style.textWrapperRight
            : style.textWrapperLeft
        } ${user.userId === message.userId ? style.leftSign : style.rightSign}`}
        sx={{ backgroundColor: `${messageBgStyle}`, order: `${textOrder}` }}
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
