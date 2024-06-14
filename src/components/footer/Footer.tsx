import React from "react";
import Image from "next/image";
import CommonIcon from "../ui/CommonIcon/CommonIcon";
import FooterMobile from "./FooterMobile/FooterMobile";
import Logo from "../../assets/Svg/logo.svg";
import {
  FooterTag,
  FooterContainer,
  NotificationContainer,
  EmailContainer,
  EmailInput,
  // EmailButton,
  ContactContainer,
  SocialMediaContainer,
  MarketPlace,
  ImageWrapper,
} from "./Footer.styled";
import styles from "./Footer.module.scss";
import CommonButton from "../ui/CommonButton/CommonButton";

const Footer = () => {
  return (
    <FooterTag>
      <FooterContainer>
        <ImageWrapper>
          <Image priority src={Logo} alt="Logo" width={104} height={77} />
        </ImageWrapper>
        <NotificationContainer>
          <p>Бажаєте отримувати повідомлення про новинки?</p>
          <EmailContainer>
            <EmailInput type="text" placeholder="Введіть свій e-mail" />
            <CommonButton
              type="button"
              title="Підписатись"
              color="light-yellow"
              className={styles.buttonSubscribe}
            />
            {/* <EmailButton>Підписатись</EmailButton> */}
          </EmailContainer>
        </NotificationContainer>
        <ContactContainer>
          <a href="tel:+380(63)0000000">+380(63)0000000</a>
          <a href="mailto:EveryBuymarket@gmail.com">EveryBuymarket@gmail.com</a>
        </ContactContainer>
        <SocialMediaContainer>
          <CommonIcon
            id="icon-facebook"
            width="40"
            height="40"
            className={styles.facebookIcon}
          />
          <CommonIcon
            id="icon-instagram"
            width="40"
            height="40"
            className={styles.instagramIcon}
          />
        </SocialMediaContainer>
      </FooterContainer>

      <FooterMobile />
      <MarketPlace>
        <p>Маркетплейс EveryBuy 2024</p>
      </MarketPlace>
    </FooterTag>
  );
};

export default Footer;
