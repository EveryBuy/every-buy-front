"use client";

import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { CommonIcon, CommonButton, DropdownMenu } from "@/components";
import Logo from "@/assets/Svg/logo.svg";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
// import clsx from "clsx";

const Header: FC = () => {
  const [isDropdownMenuVisiable, setDropdownMenuVisiable] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuHandle = () => {
    setDropdownMenuVisiable((prev) => !prev);
  };
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setDropdownMenuVisiable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.headerTag}>
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
          <CommonIcon id="icon-chat" width="20" height="20" />
          <CommonIcon id="icon-heart" width="20" height="20" />
          <Link
            href="/user"
            // className={clsx(isLoggedIn && styles.hidden)}
          >
            <CommonIcon id="icon-user" width="20" height="20" />
          </Link>
          <div ref={dropdownMenuRef}>
            <div onClick={dropdownMenuHandle}>
              <CommonIcon id="arrow-header" width="20" height="20" />
            </div>
            <DropdownMenu
              status={isDropdownMenuVisiable}
              changeStatus={dropdownMenuHandle}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
