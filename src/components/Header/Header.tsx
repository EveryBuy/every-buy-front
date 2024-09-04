"use client";

import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { CommonIcon, CommonButton } from "@/components";
import Logo from "@/assets/Svg/logo.svg";
<<<<<<< HEAD
import DropdownMenu from "./DropdownMenu";
import {
  HeaderContainer,
  HeaderTag,
  NavBar,
  List,
  AddAdvertisingContainer,
  RegisterContainer,
} from "./Header.styled";
=======
>>>>>>> module-scss
import styles from "./Header.module.scss";


const Header: FC = () => {
  const [isDropdownMenuVisiable, setDropdownMenuVisiable] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuHandle = () => {
    setDropdownMenuVisiable((prev) => !prev);
  };

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
<<<<<<< HEAD
    <HeaderTag>
      <NavBar>
        <List>
          {headerItems.map(({ text }) => (
            <li key={text}>
              <a href="">{text}</a>
            </li>
          ))}
        </List>
      </NavBar>
      <HeaderContainer>
        <Link href="/">
          <Image priority src={Logo} alt="Logo" width={104} height={77} />
        </Link>
        <AddAdvertisingContainer>
          <CommonButton
            type="button"
            title="Додати оголошення"
            color="light-yellow"
            className={styles.headerButton}
          />
          <CommonIcon id="icon-heart" width="20" height="20" />
          <RegisterContainer ref={dropdownMenuRef}>
            <div onClick={dropdownMenuHandle}>
              <CommonIcon id="icon-user" width="20" height="20" />
            </div>
            <Link href="/login">
              <button>Вхід|Реєстрація</button>
            </Link>
            <DropdownMenu
              status={isDropdownMenuVisiable}
              changeStatus={dropdownMenuHandle}
            />
          </RegisterContainer>
        </AddAdvertisingContainer>
      </HeaderContainer>
    </HeaderTag>
=======
   <header className={styles.headerTag}>
    <div className={styles.headerContainer}>
     <Image priority src={Logo} alt="Logo" width={104} height={77} />
     <div className={styles.addAdvertisingContainer}>
      <CommonButton
       type="button"
       title="Додати оголошення"
       color="yellow"
       className={styles.headerButton}
      />
      <CommonIcon id="icon-chat" width="20" height="20" />
      <CommonIcon id="icon-heart" width="20" height="20" />
      <CommonIcon id="icon-user" width="20" height="20" />
      <CommonIcon id="arrow-header" width="20" height="20" />
     </div>
      </div>
    </header>
>>>>>>> module-scss
  );
};

export default Header;
