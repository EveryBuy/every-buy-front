import React from "react";
import Image from "next/image";

import Logo from "../../asest/Svg/logo.svg";
import Heart from "../../asest/Svg/heart.svg";
import User from "../../asest/Svg/user.svg";
import {
  HeaderContainer,
  AddAdvertisingContainer,
  AddAdvertisingButton,
  RegisterContainer,
  Line,
} from "./Header.styled";

const Header = () => {
  return (
    <>
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
    </>
  );
};

export default Header;
