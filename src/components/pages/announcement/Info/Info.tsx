import { CommonIcon, ComplaintModal } from "@/components";
import styles from "./Info.module.scss";

interface InfoProps {
  articleInfo: {
    description: string;
    location: {
      city: string;
      region: string;
    };
    delivery: string[];
  };
}

export default function Info({ articleInfo }: InfoProps) {
  if (!articleInfo) {
    return <div className={styles.infoComp}>Error fetching article info</div>;
  }

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
            <CommonIcon id="location" width="25" height="25" className={styles.locationSvg} />
            <div>
              <p className={styles.city}>{location.city}</p>
              <p className={styles.region}>{location.region}</p>
            </div>
          </div>
        </div>
        <div className={styles.mobileContent}>
          <p className={styles.deliveryTitle}>Спосіб доставки</p>
          <p className={styles.text}>{delivery}</p>
        </div>
      </div>
      <ComplaintModal announcement={articleInfo} />
    </div>
  );
}
