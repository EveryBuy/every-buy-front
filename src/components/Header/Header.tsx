import React from "react";
import Image from "next/image";
import Logo from "../../asest/Svg/logo.svg";
import Heart from "../../asest/Svg/heart.svg";
import User from "../../asest/Svg/user.svg";
import {
  NavBar,
  List,
  HeaderContainer,
  AddAdvertisingContainer,
  AddAdvertisingButton,
  RegisterContainer,
  Line,
} from "./Header.styled";

const Header = () => {
  return (
    <header>
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
      <Line />
    </header>
  );
};

export default Header;
