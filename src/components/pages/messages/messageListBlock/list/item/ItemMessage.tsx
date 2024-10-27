import { FC } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { MessageData } from "@/components";
import style from "./ItemMessage.module.scss";

interface ItemMessageType {
  id?: number;
  picture?: string;
  alt: string;
  title: string;
  text: string;
}

const ItemMessage: FC<ItemMessageType> = ({ picture, alt, title, text }) => {
  return (
    <Box className={style.blockWrapper}>
      <Image
        alt={alt}
        // src={picture}
        src="/images/user.png"
        width={72}
        height={72}
        className={style.image}
      />
      <Box className={style.textWrapper}>
        <p className={style.title}>{title}:</p>
        <p className={style.text}>{text}</p>
      </Box>
      <MessageData />
    </Box>
  );
};

export default ItemMessage;
