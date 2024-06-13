import CommonIcon from "../../CommonIcon/CommonIcon";
import styles from "./Banner.module.scss";
import CommonButton from "../../CommonButton/CommonButton";
import BannerProps from "@/types/bannerProps";
import BannerBackground from "../BannerBackground/BannerBackground";
// import BannerBackground from "../BannerBackground/BannerBackground";

const Banner = ({ item }: BannerProps) => {
  const { label, title, condition, price, buttonName, backgroundImages } = item;

  // const bannerStyle = {
  //   backgroundImage: `url(${backgroundImages.mobile1x})`,
  // }; style={bannerStyle}

  return (
    <div className={styles.bannerContainer}>
      <BannerBackground backgroundImages={backgroundImages}>
        <div className={styles.bannerLabelContainer}>
          <CommonIcon
            id="icon-star"
            width="40"
            height="26"
            className={styles.bannerIcon}
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
    </div>
  );
};

export default Banner;
