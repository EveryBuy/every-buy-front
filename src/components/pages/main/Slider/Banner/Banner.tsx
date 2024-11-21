import { FC } from "react";
import { CommonIcon, CommonButton, BannerBackground } from "@/components";
import BannerProps from "@/types/bannerProps";
import styles from "./Banner.module.scss";

const Banner: FC<BannerProps> = ({ item }) => {
  const { label, title, condition, price, buttonName, backgroundImages } = item;

  return (
    <BannerBackground backgroundImages={backgroundImages}>
      <div className={styles.bannerLabelContainer}>
        <CommonIcon
          id="icon-star"
          width="30"
          height="20"
          className={`${styles.bannerIcon} ${
            label.toLocaleLowerCase() === "sale" && styles.bannerIconSale
          }`}
        />
        <span className={styles.bannerLabel}>{label}</span>
      </div>
      <h2 className={styles.bannerTitle}>{title}</h2>
      <p className={styles.bannerAdditionalInfo}>{condition || "\u00A0"}</p>
      <p className={styles.bannerPrice}>{price || "\u00A0"}</p>
      <CommonButton
        type="button"
        title={buttonName}
        color="yellow"
        className={styles.bannerButton}
      />
    </BannerBackground>
  );
};

export default Banner;
