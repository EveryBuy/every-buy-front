import BannerBackgroundProps from "@/types/bannerBackgroundProps";
import styles from "./BannerBackground.module.scss";
interface BackgroundStyles {
  [key: string]: string;
}

const BannerBackground = ({
  backgroundImages,
  children,
}: BannerBackgroundProps) => {
  const backgroundImageStyles: BackgroundStyles = {
    "--banner-background_mobile1x": `url(${backgroundImages.mobile1x})`,
    "--banner-background_mobile2x": `url(${backgroundImages.mobile2x})`,
    "--banner-background_laptop1x": `url(${backgroundImages.laptop1x})`,
    "--banner-background_laptop2x": `url(${backgroundImages.laptop2x})`,
  };

  return (
    <div className={styles.bannerBackground} style={backgroundImageStyles}>
      {children}
    </div>
  );
};

export default BannerBackground;
