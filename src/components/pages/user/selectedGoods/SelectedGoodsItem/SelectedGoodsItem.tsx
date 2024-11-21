"use client";

import { FC, useState } from "react";
import Image from "next/image";
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import heartSelected from "@/assets/Svg/heartSelected.svg";
import heart from "@/assets/Svg/heartDefault.svg";
import { favouriteAdvertisementItemType } from "@/types/favouriteAdvertisementItemType";
import styles from "./SelectedGoodsItem.module.scss";

type ItemProps = {
  item: favouriteAdvertisementItemType;
  onRemove: (advertisementId: number) => void;
};

export const SelectedGoodsItem: FC<ItemProps> = ({
  item,
  onRemove,
}: ItemProps) => {
  const [isFavourite, setIsFavourite] = useState(true);

  const handleToggleFavourite = () => {
    onRemove(item.advertisementId);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.containerSelectedGoodsItem}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={item.mainPhotoUrl}
          layout="fill"
          alt="Picture of the author"
        />
      </div>
      <div className={styles.titleWrapper}>
        <h5 className={styles.title}>{item.title}</h5>
        <p className={styles.state}>
          {item.productType === "NEW" ? "нове" : "вживане"}
        </p>
      </div>
      <div className={styles.priceWrapper}>
        <p className={styles.price}>{`${item.price} грн`}</p>
        <button className={styles.favouriteBtn} onClick={handleToggleFavourite}>
          {isFavourite ? (
            <Image
              src={heartSelected}
              alt="Description of the SVG"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={heart}
              alt="Description of the SVG"
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
      <p className={styles.dateText}>
        {`${formatAdvertisementDate(item.updateDate)}`}
        <br />
        {`${item.city?.cityName || "Хз, яке місто"}, ${
          item.city?.region.regionName || "Хз, яка область"
        }`}
      </p>
    </div>
  );
};

export default SelectedGoodsItem;
