import Image from "next/image";
import styles from "./PreviewHeader.module.scss";
import Favorite from "@/assets/Svg/heart.svg";

type Props = {
  title?: string;
  section?: string;
};

const sectionLabelMap: Record<string, string> = {
  SELL: "Продаж",
  BUY: "Купівля",
};

const PreviewHeader: React.FC<Props> = ({ title, section }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

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
