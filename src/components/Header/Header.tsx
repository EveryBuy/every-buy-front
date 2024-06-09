import React from "react";
import Image from "next/image";
import { footerItems } from "@/mock-data/footerItems";
import Logo from "../../assets/Svg/logo.svg";
import Heart from "../../assets/Svg/heart.svg";
import User from "../../assets/Svg/user.svg";
import {
  HeaderContainer,
  HeaderTag,
  NavBar,
  List,
  AddAdvertisingContainer,
  // AddAdvertisingButton,
  RegisterContainer,
} from "./Header.styled";
import styles from "./Header.module.scss";
import CommonButton from "../CommonButton/CommonButton";

const Header = () => {
  return (
    <HeaderTag>
      <NavBar>
        <List>
          {footerItems.map(({ text }) => (
            <li key={text}>
              <a href="">{text}</a>
            </li>
          ))}
        </List>
      </NavBar>
      <HeaderContainer>
        <Image priority src={Logo} alt="Logo" width={104} height={77} />
        <AddAdvertisingContainer>
          {/* <AddAdvertisingButton>Додати оголошення</AddAdvertisingButton> */}
          <CommonButton
            type="button"
            title="Додати оголошення"
            color="light-yellow"
            className={styles.headerButton}
          />
          <Image priority src={Heart} alt="Heart" width={32} height={32} />
          <RegisterContainer>
            <Image src={User} alt="User" width={32} height={32} />
            <button>Вхід|Реєстрація</button>
          </RegisterContainer>
        </AddAdvertisingContainer>
      </HeaderContainer>
    </HeaderTag>
  );
};

export default Header;
