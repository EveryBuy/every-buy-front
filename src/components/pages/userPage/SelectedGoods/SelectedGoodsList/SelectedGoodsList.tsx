import { FC } from "react";
import styles from "./SelectedGoodsList.module.css";
import SelectedGoodsItem from "../SelectedGoodsItem/SelectedGoodsItem";
import { nanoid } from "nanoid";
import { favouriteItems } from "@/mock-data/favouriteItems";

export const SelectedGoodsList: FC = () => {
  const items = favouriteItems;
  return (
    <div className={styles.containerSelectedGoodsList}>
      <ul className={styles.selectedGoodsList}>
        {items.map((elem) => {
          return (
            <li key={nanoid()}>
              <SelectedGoodsItem item={elem} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectedGoodsList;
