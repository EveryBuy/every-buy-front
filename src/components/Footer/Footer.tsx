import { FC } from "react";
import React from "react";
import Image from "next/image";
import { CommonIcon, CommonButton, FooterMobile } from "@/components";
import Logo from "@/assets/Svg/logo.svg";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={`${styles.footerTag}`}>
      <div className={styles.footerContainer}>
        <div className={styles.wrapperLogo}>
          <Image
            className={styles.logo}
            priority
            src={Logo}
            alt="Logo"
            width={104}
            height={77}
          />
          <div className={styles.contactContainer}>
            <a href="tel:+380(63)0000000" className={styles.contactText}>
              +380(63)0000000
            </a>
            <a
              href="mailto:EveryBuymarket@gmail.com"
              className={styles.contactText}
            >
              EveryBuymarket@gmail.com
            </a>
          </div>
        </div>
        <div className={styles.wrapperSearch}>
          <p className={styles.footerText}>
            {" "}
            Бажаєте отримувати <br className={styles.hidden} /> повідомлення про
            новинки?
          </p>
          <div className={styles.wrapperContent}>
            <div className={styles.mailWrapper}>
              <input
                type="text"
                placeholder="Введіть свій e-mail"
                className={styles.emailInput}
              />
              <CommonButton
                type="button"
                title="Підписатись"
                color="yellow"
                className={styles.buttonSubscribe}
              />
            </div>
            <div className={styles.social}>
              <CommonIcon
                id="facebook-footer"
                width="40"
                height="40"
                className={styles.facebookIcon}
              />
              <CommonIcon
                id="instagram-footer"
                width="40"
                height="40"
                className={styles.instagramIcon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.marketPlace}>
        <p className={styles.marketPlaceText}>Маркетплейс EveryBuy 2024</p>
      </div>
      <FooterMobile />
    </footer>
  );
};

export default Footer;
