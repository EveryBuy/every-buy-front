"use client";
import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Menu, CommonIcon } from "@/components";
import style from "./Companion.module.scss";

type CompanionBlockType = {
  setSelectedChatId: (chatId: number | null) => void;
  blockUserWindowHandle: (() => void) | undefined;
  complaintWindowHandle: (() => void) | undefined;
  chatId: number | null;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
  chatData: any;
  isCompanionBlocked: boolean | null;
  isUserBlockedByCompanion: boolean | null;
};

const Companion: FC<CompanionBlockType> = ({
  setSelectedChatId,
  blockUserWindowHandle,
  complaintWindowHandle,
  chatId,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
  chatData,
  isCompanionBlocked,
  isUserBlockedByCompanion,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const companionPictureUrl = chatData?.userData?.photoUrl;
  const companionName = chatData?.userData?.fullName;

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
        // for mobile version
        onClick={() => setSelectedChatId(null)}
        // onClick={() => setSelectedChatId(0)}
      />
      {/* blocks position for mobile */}
      <Box
        className={style.companion}
        sx={{
          display: {
            xs: "flex",
          },
          "@media (min-width:500px)": {
            display: "none",
          },
        }}
      >
        {picture}
        <Box className={style.companionInfo}>
          <p
            className={`${style.name} ${
              isCompanionBlocked || isUserBlockedByCompanion
                ? style.blocked
                : ""
            }`}
          >
            {name}
          </p>
          <p className={style.time}>Як нам дізнатися час?</p>
        </Box>
      </Box>
      <Box
        className={style.companionMenuWrapper}
        sx={{
          display: {
            xs: "flex",
          },
          "@media (min-width:500px)": {
            display: "none",
          },
        }}
        ref={menuRef}
      >
        <Box className={style.companionMenu} onClick={menuHandle}>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Menu
            status={isMenuVisible}
            changeStatus={menuHandle}
            blockUserWindowHandle={blockUserWindowHandle}
            complaintWindowHandle={complaintWindowHandle}
            chatId={chatId}
            isHeartSelected={isHeartSelected}
            setHeartSelected={setHeartSelected}
            isArchived={isArchived}
            setArchived={setArchived}
          />
        </Box>
      </Box>
      {/* blocks position for tablet and desktop */}
      <Box
        sx={{
          display: { xs: "none" },
          "@media (min-width:500px)": {
            display: "flex",
            justifyContent: { md: "space-between" },
          },
          "@media (min-width:1024px)": {
            width: "100%",
          },
        }}
      >
        <Box className={style.companion} sx={{ mr: { xs: "50px" } }}>
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
            <Menu
              status={isMenuVisible}
              changeStatus={menuHandle}
              blockUserWindowHandle={blockUserWindowHandle}
              complaintWindowHandle={complaintWindowHandle}
              chatId={chatId}
              isHeartSelected={isHeartSelected}
              setHeartSelected={setHeartSelected}
              isArchived={isArchived}
              setArchived={setArchived}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Companion;
