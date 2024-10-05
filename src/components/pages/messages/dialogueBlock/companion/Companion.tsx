"use client";

import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { Menu } from "@/components";
import style from "./Companion.module.scss";

const Companion: FC = () => {
  const [isMenuVisiable, setMenuVisiable] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuHandle = () => {
    setMenuVisiable((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisiable(false);
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
        <Image
          alt=""
          src="/images/user.png"
          width={72}
          height={72}
          className={style.picture}
        />
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
          <Menu status={isMenuVisiable} changeStatus={menuHandle} />
        </Box>
      </Box>
    </Box>
  );
};

export default Companion;
