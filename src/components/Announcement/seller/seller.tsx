import Image from "next/image";
import styles from "./seller.module.scss";
import arrowUrl from "../../../assets/Svg/rightArrow.svg";
import imageUrl from "../../../assets/pc.png";

interface resSellerObj {
  nameUkr: string;
  //   photoUrl: string;
  online: boolean;
  linkToAllAdvert: string;
}

interface ResSeller {
  sellerInfo: resSellerObj;
}

export default function Seller({ sellerInfo }: ResSeller) {
  const { nameUkr, online, linkToAllAdvert } = sellerInfo;
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Продавець</h3>
      <div className={styles.sellerInfo}>
        <Image src={imageUrl} alt="Seller" className={styles.sellerImage} />
        <div>
          <h4 className={styles.name}>{nameUkr}</h4>
          <p
            className={`${styles.status} ${
              online ? styles.online : styles.offline
            }`}
          >
            {online ? "Зараз онлайн" : "Зараз офлайн"}
          </p>
        </div>
      </div>
      <a href="linkToAllAdvert" className={styles.allOrders}>
        Усі оголошення автора
        <Image className={styles.arrow} src={arrowUrl} alt="Right arrow" />
      </a>
    </div>
  );
}
