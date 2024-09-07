import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { CommonIcon, CommonInput } from "@/components";
import style from "./Dialogue.module.scss";

const Dialogue = () => {
  return (
    <Box className={style.blockWrapper}>
      <Box className={style.dateWrapper}>
        <Box className={style.date}>20 трав 2024</Box>
      </Box>
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
    </Box>
  );
};

export default Dialogue;
