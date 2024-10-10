"use client";

import { useState, useEffect, useRef, FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { useAppSelector } from "@/redux/store";
// import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { CommonIcon, CommonButton, DropdownMenu } from "@/components";
import Logo from "@/assets/Svg/logo.svg";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const path = usePathname();
  const [isDropdownMenuVisible, setDropdownMenuVisible] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuHandle = () => {
    setDropdownMenuVisible((prev) => !prev);
  };
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
    <header className={styles.header}>
      <div
        className={
          path === "/messages"
            ? `${styles.headerContainer} ${styles.headerMessagePageContainer}`
            : styles.headerContainer
        }
      >
        <Link href="/" className={path === "/messages" ? styles.logo : ""}>
          <Image priority src={Logo} alt="Logo" width={104} height={77} />
        </Link>

        {path === "/messages" ? (
          <CommonButton type="submit" title="" className={styles.searchButton}>
            <CommonIcon id="icon-search" width="25" height="25" />
          </CommonButton>
        ) : null}

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
