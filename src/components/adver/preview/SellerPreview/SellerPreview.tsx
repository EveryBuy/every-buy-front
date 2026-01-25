import React from "react";
import Image from "next/image";
import styles from "./SellerPreview.module.scss";

type Props = {
  avatar: string;
  name: string;
};

const SellerPreview: React.FC<Props> = ({ avatar, name }) => {
  return (
    <div className={styles.sellerBlock}>
      <p className={styles.sellerTitle}>Продавець</p>

      <div className={styles.sellerInfo}>
        <Image
          src={avatar}
          width={48}
          height={48}
          alt="seller"
          className={styles.sellerImg}
        />

        <div>
          <div className={styles.sellerName}>{name}</div>
          <div className={styles.sellerStatus}>
            <span className={styles.greenDot} /> Зараз онлайн
          </div>
        </div>
      </div>

      <button className={styles.allSellerAdBtn}>
        Усі оголошення автора {">"}
      </button>
    </div>
  );
};

export default SellerPreview;
