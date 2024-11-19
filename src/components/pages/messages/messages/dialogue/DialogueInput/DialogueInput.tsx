import { FC } from "react";
import { Box, TextField } from "@mui/material";
import { CommonIcon } from "@/components";
import { MessageType } from "@/types/messages/messages";
import style from "./DialogueInput.module.scss";

// type DialogueInputType = {
//   message: MessageType;
// };

const DialogueInput: FC = () => {
  return (
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
      />
      {/* </Box> */}
      <Box className={style.sendIconWrapper}>
        <CommonIcon
          id="message-send"
          className={style.iconSend}
          // onClick={handleIconHeartClick}
        />
      </Box>
    </Box>
  );
};

export default DialogueInput;
