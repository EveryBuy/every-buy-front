import { FC } from "react";
import styles from "./SelectedGoodsItem.module.css";
import { nanoid } from "nanoid";
import Image from "next/image";
import heartSelected from "@/assets/Svg/heartSelected.svg";
import formatAdvertisementDate from "@/utils/formatAdvertisementDate";
import { favouriteAdvertisementItemType } from "@/types/favouriteAdvertisementItemType";

type ItemProps = {
  item: favouriteAdvertisementItemType;
};

export const SelectedGoodsItem: FC<ItemProps> = ({ item }: ItemProps) => {
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
        <Image
          src={heartSelected}
          alt="Description of the SVG"
          width={24}
          height={24}
        />
      </div>
      <p className={styles.dateText}>
        {`${formatAdvertisementDate(item.updateDate)}`}
        <br />
        {`${item.city.cityName}, ${item.city.region.regionName}`}
      </p>
    </div>
  );
};

export default SelectedGoodsItem;
