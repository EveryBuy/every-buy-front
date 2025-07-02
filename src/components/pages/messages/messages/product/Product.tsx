"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import style from "./Product.module.scss";
import { CommonPreloader } from "@/components";

const Product = ({ chatData }: { chatData: any }) => {
  const picture = chatData?.shortAdvertisementInfo?.mainPhotoUrl ? (
    <Image
      alt=""
      src={chatData?.shortAdvertisementInfo?.mainPhotoUrl}
      width={50}
      height={50}
      className={style.picture}
    />
  ) : (
    <Box className={style.noPicture}>
      <CameraAltIcon />
    </Box>
  );
  const advTitle = chatData?.shortAdvertisementInfo?.title;
  const advPrice = chatData?.shortAdvertisementInfo?.price;

  return (
    <Box className={style.blockWrapper}>
      {picture && advTitle && advPrice ? (
        <>
          {picture}
          <Box className={style.textInfo}>
            <p className={style.name}>{advTitle ? advTitle : ""}</p>
            <p className={style.sum}>{advPrice ? `${advPrice} грн` : ""}</p>
          </Box>
        </>
      ) : (
        <CommonPreloader sx={{ color: "#e5ff46" }} />
      )}
    </Box>
  );
};

export default Product;
