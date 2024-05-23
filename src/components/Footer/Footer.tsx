import React from "react";
import Logo from "../../asest/Svg/logo.svg";
import Image from "next/image";
import { FooterContainer, Line,NotificationContainer,EmailContainer,EmailInput,EmailButton } from "./Footer.styled";

const Footer = () => {
  return (
    <>
      <Line />
      <FooterContainer>
        <Image src={Logo} alt="Logo  " />
        <NotificationContainer>
            <p>Бажаєте отримувати повідомлення про новинки?</p>
            <EmailContainer>
                <EmailInput type="text" placeholder="Введіть свій e-mail"/>
                <EmailButton>Підписатись</EmailButton>
            </EmailContainer>
        </NotificationContainer>
      </FooterContainer>
    </>
  );
};

export default Footer;
