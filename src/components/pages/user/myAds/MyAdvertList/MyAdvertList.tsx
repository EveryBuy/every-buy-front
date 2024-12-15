import { AdvertItem } from "@/types/myAdvertisementsTypes";
import MyAdvertItem from "../MyAdvertItem/MyAdvertItem";
import { FC } from "react";
import styles from "./MyAdvertList.module.css";

type AdvertList = {
  advertList: AdvertItem[];
};

export const MyAdvertList: FC<AdvertList> = ({ advertList }) => {
  return (
    <section>
      <ul className={styles.listBox}>
        {advertList.map((elem) => (
          <li key={elem.id}>
            <MyAdvertItem item={elem} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MyAdvertList;
