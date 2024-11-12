"use client";

import { useState, useEffect, useRef, FC } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Box } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Menu } from "@/components";
import { RootState } from "@/redux/store";
import style from "./Companion.module.scss";

const Companion: FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pictureUrl = useSelector(
    (state: RootState) => state.messages?.messages[0]?.userPhotoUrl
  );
  console.log(pictureUrl);

  const picture = pictureUrl ? (
    <Image
      alt=""
      src={pictureUrl}
      width={72}
      height={72}
      className={style.picture}
    />
  ) : (
    <Box className={style.noPicture}>
      <CameraAltIcon />
    </Box>
  );

  const menuHandle = () => {
    setMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box className={style.companionWrapper}>
      <Box className={style.companion}>
        {picture}
        {/* <Image
          alt=""
          src="/images/user.png"
          width={72}
          height={72}
          className={style.picture}
        /> */}
        <Box className={style.companionInfo}>
          <p className={style.name}>Анна</p>
          <p className={style.time}>У мережі 40 хв. тому</p>
        </Box>
      </Box>
      <Box className={style.companionMenuWrapper} ref={menuRef}>
        <Box className={style.companionMenu} onClick={menuHandle}>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Menu status={isMenuVisible} changeStatus={menuHandle} />
        </Box>
      </Box>
    </Box>
  );
};

export default Companion;
