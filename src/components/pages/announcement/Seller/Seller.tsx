import Image from "next/image";
import arrowUrl from "../../../../assets/Svg/rightArrow.svg";
import imageUrl from "../../../../assets/pc.png";
import styles from "./Seller.module.scss";

interface SellerProps {
  sellerInfo: {
    nameUkr: string;
    online: boolean;
    linkToAllAdvert: string;
    imageUrl: string;
  };
}

export default function Seller({ sellerInfo }: SellerProps) {
  if (!sellerInfo) {
    return <div className={styles.container}>Error fetching seller info</div>;
  }

  const { nameUkr, online, linkToAllAdvert, imageUrl: sellerImageUrl } = sellerInfo;

  const sellerName = nameUkr || "Невідомо";

  const imageSrc = sellerImageUrl || imageUrl;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Продавець</h3>
      <div className={styles.sellerInfo}>
        <Image
          width={83}
          height={83}
          src={imageSrc}
          alt="Seller"
          className={styles.sellerImage}
        />
        <div>
          <h4 className={styles.name}>{sellerName}</h4>
          <p className={`${styles.status} ${online ? styles.online : styles.offline}`}>
            {online ? "Зараз онлайн" : "Зараз офлайн"}
          </p>
        </div>
      </div>
      <a href={linkToAllAdvert} className={styles.allOrders}>
        Усі оголошення автора
        <Image className={styles.arrow} src={arrowUrl} alt="Right arrow" />
      </a>
    </div>
  );
}
