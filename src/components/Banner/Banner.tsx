import CommonIcon from "../CommonIcon/CommonIcon";
import styles from "./Banner.module.scss";
import CommonButton from "../CommonButton/CommonButton";
import BannerProps from "@/types/bannerProps";

const Banner = ({ item }: BannerProps) => {
  const { label, title, condition, price, buttonName, backgroundImage } = item;

  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className={styles.bannerContainer} style={bannerStyle}>
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
    </div>
  );
};

export default Banner;
