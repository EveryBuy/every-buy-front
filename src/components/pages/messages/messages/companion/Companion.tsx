"use client";
import { useState, useEffect, useRef, FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { Box } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
<<<<<<< HEAD
import { Menu } from "@/components";
=======
import { Menu, CommonIcon } from "@/components";
>>>>>>> 3c6254c7bbb0f754f23afe00e6624536522817f6
import style from "./Companion.module.scss";

type CompanionBlockType = {
  setSelectedChatId: (chatId: number | null) => void;
};

const Companion: FC<CompanionBlockType> = ({ setSelectedChatId }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const companionPictureUrl = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.userData?.photoUrl : null
  );
  const companionName = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.userData?.fullName : null
  );

  const picture = companionPictureUrl ? (
    <Image
      alt=""
      src={companionPictureUrl}
      width={72}
      height={72}
      className={style.picture}
    />
  ) : (
    <Box className={style.noPicture}>
      <CameraAltIcon />
    </Box>
  );
  const name = companionName ? companionName : "anonym";

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
      <CommonIcon
        id="back-arrow"
        className={style.backArrow}
        onClick={() => setSelectedChatId(null)}
      />
      <Box className={style.companion}>
        {picture}
        <Box className={style.companionInfo}>
          <p className={style.name}>{name}</p>
          <p className={style.time}>Як нам дізнатися час?</p>
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
