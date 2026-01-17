import Image from "next/image";
import styles from "./PreviewHeader.module.scss";
import Favorite from "@/assets/Svg/heart.svg";

type Props = {
  title?: string;
  section?: string;
  productType?: string;
};

const sectionLabelMap: Record<string, string> = {
  SELL: "Продаж",
  BUY: "Купівля",
};

const productTypeLabelMap: Record<string, string> = {
  NEW: "Нове",
  USED: "Вживане",
  OTHER: "Інше",
};

const PreviewHeader: React.FC<Props> = ({ title, section, productType }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.productType}>
          {productTypeLabelMap[productType || ""] || ""}
        </h4>
      </div>

      <div className={styles.labelWrapper}>
        <Image src={Favorite} alt="icon select" width={24} height={24} />
        <h4 className={styles.label}>
          {sectionLabelMap[section || ""] || ""}
        </h4>
      </div>
    </div>
  );
};


export default PreviewHeader;
