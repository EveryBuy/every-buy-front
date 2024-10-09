"use client";

import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { CommonIcon, CommonButton, DropdownMenu } from "@/components";
import Logo from "@/assets/Svg/logo.svg";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

const Header: FC = () => {
  const [isDropdownMenuVisible, setDropdownMenuVisible] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuHandle = () => {
    setDropdownMenuVisible((prev) => !prev);
  };
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`${styles.headerTag}`}>
      <div className={styles.headerContainer}>
        <Link href="/">
          <Image priority src={Logo} alt="Logo" width={104} height={77} />
        </Link>
        <div className={styles.addAdvertisingContainer}>
          <CommonButton
            type="button"
            title="Додати оголошення"
            color="yellow"
            className={styles.headerButton}
          />
          <CommonIcon id="icon-chat" width="21" height="20" />
          <CommonIcon id="icon-heart" width="21" height="20" />
          <Link href="/user" className={styles.linkToUserPage}>
            <CommonIcon id="icon-user" width="21" height="20" />
          </Link>
          <div ref={dropdownMenuRef} className={styles.iconDropdown}>
            <div onClick={dropdownMenuHandle}>
              <CommonIcon id="arrow-header" width="17" height="17" />
            </div>
            <DropdownMenu
              status={isDropdownMenuVisible}
              changeStatus={dropdownMenuHandle}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
