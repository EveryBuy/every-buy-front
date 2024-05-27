import React from "react";
import Logo from "../../asest/Svg/logo.svg";
import Facebook from "../../asest/Svg/facebook.svg";
import Instagram from "../../asest/Svg/instagram.svg";
import Image from "next/image";
import {
  FooterContainer,
  Line,
  NotificationContainer,
  EmailContainer,
  EmailInput,
  EmailButton,
  ContactContainer,
  SocialMediaContainer,
  MarketPlace,
} from "./Footer.styled";

const Footer = () => {
  return (
    <>
      <Line />
      <FooterContainer>
        <Image src={Logo} alt="Logo  " />
        <NotificationContainer>
          <p>Бажаєте отримувати повідомлення про новинки?</p>
          <EmailContainer>
            <EmailInput type="text" placeholder="Введіть свій e-mail" />
            <EmailButton>Підписатись</EmailButton>
          </EmailContainer>
        </NotificationContainer>
        <ContactContainer>
          <a href="tel:+380(63)0000000">+380(63)0000000</a>
          <a href="mailto:EveryBuymarket@gmail.com">EveryBuymarket@gmail.com</a>
        </ContactContainer>
        <SocialMediaContainer>
          <Image src={Facebook} alt="Facebook" />
          <Image src={Instagram} alt="Instagram" />
        </SocialMediaContainer>
      </FooterContainer>
      <MarketPlace>
        <p>Маркетплейс EveryBuy 2024</p>
      </MarketPlace>
    </>
  );
};

export default Footer;
