import CommonIcon from "../../ui/CommonIcon/CommonIcon";
import styles from "./Banner.module.scss";
import CommonButton from "../../ui/CommonButton/CommonButton";
import BannerProps from "@/types/bannerProps";
import BannerBackground from "../BannerBackground/BannerBackground";
import {
  BannerAdditionalInfo,
  BannerLabel,
  BannerLabelContainer,
  BannerPrice,
  BannerTitle,
} from "./Banner.styled";

const Banner = ({ item }: BannerProps) => {
  const { label, title, condition, price, buttonName, backgroundImages } = item;

  return (
    <BannerBackground backgroundImages={backgroundImages}>
      <BannerLabelContainer>
        <CommonIcon
          id="icon-star"
          fill={
            label.toLocaleLowerCase() === "sale"
              ? "var(--error)"
              : "var(--not-active)"
          }
        />
        <BannerLabel>{label}</BannerLabel>
      </BannerLabelContainer>
      <BannerTitle>{title}</BannerTitle>
      <BannerAdditionalInfo>{condition || "\u00A0"}</BannerAdditionalInfo>
      <BannerPrice>{price || "\u00A0"}</BannerPrice>
      <CommonButton type="button" title={buttonName} color="yellow" />
    </BannerBackground>
  );
};

export default Banner;
