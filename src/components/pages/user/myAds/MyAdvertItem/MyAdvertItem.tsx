import Image from "next/image";
import { FC } from "react";
import heart from "@/assets/Svg/heart.svg";
import eye from "@/assets/Svg/Eye.svg";
import bin from "@/assets/Svg/bin.svg";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import { MyAdvertItemType } from "@/types/myAdvertisementsTypes";
import styles from "./MyAdvertItem.module.css";

export const MyAdvertItem: FC<MyAdvertItemType> = ({ item }) => {
  const {
    id,
    section,
    title,
    state,
    price,
    userId,
    mainPhotoUrl,
    favouriteCount,
    view,
  } = item;

  return (
    <section className={styles.myAdvertItemContainer}>
      <div className={styles.itemImageBox}>
        <Image
          className={styles.itemImage}
          src={mainPhotoUrl}
          alt="Advert photo"
          width={96}
          height={96}
        />
        <div className={styles.itemTitleBox}>
          <p className={styles.itemTitle}>{title}</p>
          <p className={styles.itemState}>{state}</p>
          <p>{price} грн</p>
        </div>
      </div>
      <div className={styles.itemStatsBox}>
        <div className={styles.itemStats}>
          <Image src={eye} alt="views count" width={32} height={32} />
          <p>{view ? view : 0}</p>
        </div>
        <div className={styles.itemStats}>
          <Image src={heart} alt="favourite count" width={30} height={30} />
          <p>{favouriteCount}</p>
        </div>
      </div>
      <div className={styles.itemButtonBox}>
        <CommonButton
          type="button"
          title="Редагувати"
          className={styles.itemButton}
        ></CommonButton>
        <CommonButton
          type="button"
          title="Деактивувати"
          className={styles.itemButton}
        ></CommonButton>
        <CommonButton type="button" title="" className={styles.itemDelButton}>
          <Image src={bin} alt="delete icon" width={23} height={23} />
        </CommonButton>
      </div>
    </section>
  );
};

export default MyAdvertItem;
