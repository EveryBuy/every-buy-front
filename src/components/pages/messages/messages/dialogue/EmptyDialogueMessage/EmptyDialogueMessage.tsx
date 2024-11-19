"use client";

import { FC } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import style from "./EmptyDialogueMessage.module.scss";

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
        // className={style.picture}
      />
    </Box>
  );
};

export default EmptyDialogueMessage;
