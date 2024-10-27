"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { CommonIcon, CommonInput } from "@/components";
import style from "./Dialogue.module.scss";

const EmptyDialogueMessage: FC = () => {
  return (
    <Box className={style.noticeWrapper}>
      <p>Повідомлень ще немає...</p>
      <p>Відправте своє повідомлення, і воно відобразиться тут.</p>
      <Image
        alt=""
        src="/images/letter.png"
        width={105}
        height={98}
        className={style.picture}
      />
    </Box>
  );
};

const Dialogue: FC = () => {
  const [inputNewMessageValue, setInputNewMessageValue] = useState<string>("");

  return (
    <Box className={style.blockWrapper}>
      <Box className={style.dateWrapper}>
        <Box className={style.date}>20 трав 2024</Box>
      </Box>

      <Box className={style.dialogue}>
        <EmptyDialogueMessage />
      </Box>

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
        {/* <CommonInput
            typeTitle="inputNewMessageValue"
            typeInput="text"
            value={inputNewMessageValue}
            setValue={(e) => setInputNewMessageValue(e.target.value)}
            placeholder="Напишіть повідомлення..."
            className={style.input}
          /> */}
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
    </Box>
  );
};

export default Dialogue;
