import React from "react";
import Logo from "../../asest/Svg/logo.svg";
import Facebook from "../../asest/Svg/facebook.svg";
import Instagram from "../../asest/Svg/instagram.svg";
//
import House from "../../asest/Svg/house.svg";
import SmallHeart from "../../asest/Svg/smallHeart.svg";
import AddIcon from "../../asest/Svg/addIcon.svg";
import Chat from "../../asest/Svg/chat.svg";
import SmallUser from "../../asest/Svg/smallUser.svg";

//
import Image from "next/image";
import {
  FooterTag,
  FooterContainer,
  NotificationContainer,
  EmailContainer,
  EmailInput,
  EmailButton,
  ContactContainer,
  SocialMediaContainer,
  MarketPlace,
  FooterContainerMobile,
  ImageWrapper,
  MobilePaginationItem,
  MobilePaginationButton,
} from "./Footer.styled";

const Footer = () => {
  return (
    <FooterTag>
      <FooterContainer>
        <ImageWrapper>
          <Image src={Logo} alt="Logo  " />
        </ImageWrapper>
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
      <FooterContainerMobile>
        <MobilePaginationItem>
          <MobilePaginationButton>
            <Image src={House} alt="House" />
            <span>Головна</span>
          </MobilePaginationButton>
        </MobilePaginationItem>
        <MobilePaginationItem>
          <MobilePaginationButton>
            <Image src={SmallHeart} alt="SmallHeart" />
            <span>Вибране</span>
          </MobilePaginationButton>
        </MobilePaginationItem>
        <MobilePaginationItem>
          <MobilePaginationButton>
            <Image src={AddIcon} alt="AddIcon" />
            <span>Створити</span>
          </MobilePaginationButton>
        </MobilePaginationItem>
        <MobilePaginationItem>
          <MobilePaginationButton>
            <Image src={Chat} alt="Chat" />
            <span>Чат</span>
          </MobilePaginationButton>
        </MobilePaginationItem>
        <MobilePaginationItem>
          <MobilePaginationButton>
            <Image src={SmallUser} alt="SmallUser" />
            <span>Профіль</span>
          </MobilePaginationButton>
        </MobilePaginationItem>
      </FooterContainerMobile>
      <MarketPlace>
        <p>Маркетплейс EveryBuy 2024</p>
      </MarketPlace>
    </FooterTag>
  );
};

export default Footer;
