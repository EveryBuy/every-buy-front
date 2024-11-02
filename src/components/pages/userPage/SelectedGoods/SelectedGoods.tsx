"use client";

import { FC, useState } from "react";
import s from "../UserPage.module.scss";
import styles from "./SelectedGoods.module.css";
import CommonSelect from "@/components/ui/CommonSelect/CommonSelect";
import SelectedGoodsList from "./SelectedGoodsList/SelectedGoodsList";

const ocupation = ["Businessman", "Employee", "Freelancer", "Retired"];
const widthSize = {
  mobile: "0",
  tablet: "406px",
  laptop: "280px",
};

export const SelectedGoods: FC = () => {
  const [category, setCategory] = useState("");

  return (
    <div className={styles.SelectedGoodsContainer}>
      <h3 className={s.headline}>Мої обрані товари</h3>
      <CommonSelect
        label="Виберіть категорію"
        options={ocupation}
        size={widthSize}
        outlineColor="var(--button)"
        value={category}
        onChange={(evt) => setCategory(evt.target.value)}
      />
      <SelectedGoodsList />
    </div>
  );
};

export default SelectedGoods;
