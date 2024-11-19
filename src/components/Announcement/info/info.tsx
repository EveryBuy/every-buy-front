import styles from "./info.module.scss";
import Image from "next/image";
import locationSvg from "../../../assets/Svg/location.svg";
import { CommonIcon } from "@/components";
import { FaLocationDot } from "react-icons/fa6";
import ComplaintModal from "@/components/ComplaintModal/ComplaintModal";

interface locationObj {
  city: string;
  region: string;
}

interface resArticleObj {
  description: string;
  location: locationObj;
  delivery: string[];
}

interface ArticleInfo {
  articleInfo: resArticleObj;
}

export default function Info({ articleInfo }: ArticleInfo) {
  const { description, location, delivery } = articleInfo;
  return (
    <div className={styles.infoComp}>
      <div className={styles.list}>
        <div>
          <p className={styles.description}>Опис</p>
          <p className={styles.text}>{description}</p>
        </div>
        <div>
          <p className={styles.locationTitle}>Місцезнаходження</p>
          <div className={styles.locationInfo}>
            <CommonIcon
              id="location"
              width="25"
              height="25"
              className={styles.locationSvg}
            />
            {/* <FaLocationDot size={25} /> */}
            {/* <Image
              src={locationSvg}
              priority
              alt="Location"
              className={styles.locationSvg}
            /> */}
            <div>
              <p className={styles.city}>{location.city}</p>
              <p className={styles.region}>{location.region}</p>
            </div>
          </div>
        </div>
        <div className={styles.mobileContent}>
          <p className={styles.deliveryTitle}>Спосіб доставки</p>
          <p className={styles.text}>{delivery.join(", ")}</p>
        </div>
      </div>
        <ComplaintModal />
    </div>
  );
}
