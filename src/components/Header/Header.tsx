'use client';

import { FC } from "react";
import Image from "next/image";
import { CommonIcon, CommonButton } from "@/components";
import { headerItems } from "@/mock-data/headerItems";
import Logo from "@/assets/Svg/logo.svg";
import {
  HeaderContainer,
  HeaderTag,
  NavBar,
  List,
  AddAdvertisingContainer,
  RegisterContainer,
} from "./Header.styled";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { selectIsLoggedIn } from "@/redux/auth/selectors";

const Header: FC = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
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
      <HeaderContainer className={styles.headerContainer}>
        <Image priority src={Logo} alt="Logo" width={104} height={77} />
        <AddAdvertisingContainer className={styles.addAdvertisingContainer}>
          <CommonButton
            type="button"
            title="Додати оголошення"
            color="yellow"
            className={styles.headerButton}
          />
          <CommonIcon id="icon-chat" width="20" height="20" />
          <CommonIcon id="icon-heart" width="20" height="20" />
          <RegisterContainer>
            <Link href="/login">
              <CommonIcon id="icon-user" width="20" height="20" />
              {!isLoggedIn && <button>Вхід|Реєстрація</button>}
            </Link>
          </RegisterContainer>
        </AddAdvertisingContainer>
      </HeaderContainer>
    </HeaderTag>
  );
};

export default Header;
