"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Box } from "@mui/material";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import style from "./Product.module.scss";

const Product = () => {
  const advPicture = useSelector((state: RootState) =>
    state.messages?.chat
      ? state.messages.chat.shortAdvertisementInfo?.mainPhotoUrl
      : null
  );
  const picture = advPicture ? (
    <Image
      alt=""
      src={advPicture}
      width={50}
      height={50}
      className={style.picture}
    />
  ) : (
    <Box className={style.noPicture}>
      <CameraAltIcon />
    </Box>
  );
  const advTitle = useSelector((state: RootState) =>
    state.messages?.chat
      ? state.messages.chat.shortAdvertisementInfo?.title
      : null
  );
  const advPrice = useSelector((state: RootState) =>
    state.messages?.chat
      ? state.messages.chat.shortAdvertisementInfo?.price
      : null
  );

  return (
    <Box className={style.blockWrapper}>
      {picture}
      <Box className={style.textInfo}>
        <p className={style.name}>{advTitle ? advTitle : ""}</p>
        <p className={style.sum}>{advPrice ? `${advPrice} грн` : ""}</p>
      </Box>
    </Box>
  );
};

export default Product;
