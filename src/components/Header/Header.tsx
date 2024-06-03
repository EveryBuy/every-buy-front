import React from "react";
import Image from "next/image";
import CommonIcon from "../CommonIcon/CommonIcon";
import Logo from "../../assets/Svg/logo.svg";
import Heart from "../../assets/Svg/heart.svg";
import User from "../../assets/Svg/user.svg";
import {
  HeaderContainer,
  HeaderTag,
  NavBar,
  List,
  AddAdvertisingContainer,
  AddAdvertisingButton,
  RegisterContainer,
} from "./Header.styled";

const Header = () => {
  return (
    <HeaderTag>
      <NavBar>
        <List>
          <li>
            <a href="">Про нас</a>
          </li>
          <li>
            <a href="">Акції</a>
          </li>
          <li>
            <a href="">Доставка</a>
          </li>
          <li>
            <a href="">Контакти</a>
          </li>
        </List>
      </NavBar>
      <HeaderContainer>
        <Image src={Logo} alt="Logo" />
        <AddAdvertisingContainer>
          <AddAdvertisingButton>Додати оголошення</AddAdvertisingButton>
          <Image src={Heart} alt="Heart" />
          <RegisterContainer>
            <Image src={User} alt="User" />
            <button>Вхід|Реєстрація</button>
          </RegisterContainer>
        </AddAdvertisingContainer>
      </HeaderContainer>
    </HeaderTag>
  );
};

export default Header;