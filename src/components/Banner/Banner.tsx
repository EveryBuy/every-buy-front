import { bannerItems } from "@/mock-data/bannerItems";
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
    <div className={styles.bannerItem} style={bannerStyle}>
      <CommonIcon
        id="icon-star"
        width="40"
        height="26"
        className={styles.bannerIcon}
      />
      <span>{label}</span>
      <h2>{title}</h2>
      <p>{condition}</p>
      <p>{price}</p>
      <CommonButton type="button" title={buttonName} color="yellow" />
    </div>
  );
};

export default Banner;
