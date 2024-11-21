"use client";

import { FC, useEffect, useState } from "react";
import { CommonSelect, SelectedGoodsList } from "@/components";
import { getCategory } from "@/redux/advertisement/operations";
import { selectCategories } from "@/redux/advertisement/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import s from "../UserPage.module.scss";
import styles from "./SelectedGoods.module.scss";

const widthSize = {
  mobile: "0",
  tablet: "406px",
  laptop: "280px",
};

export const SelectedGoods: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoryNames = categories.map((elem: any) => elem.categoryName);
  const [category] = categories.filter(
    (elem: any) => elem.categoryName === selectedCategory
  );
  const [section, setSection] = useState("");

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleBuy = () => {
    setSection("BUY");
  };

  const handleSell = () => {
    setSection("SELL");
  };

  return (
    <section className={styles.SelectedGoodsContainer}>
      <h3 className={s.headline}>Мої обрані товари</h3>
      <div className={styles.selectorBox}>
        <CommonSelect
          label="Виберіть категорію"
          options={categoryNames}
          size={widthSize}
          outlineColor="var(--button)"
          value={selectedCategory}
          onChange={(evt) => setSelectedCategory(evt.target.value)}
        />
        <div className={styles.buttonBox}>
          <ul className={styles.buttonList}>
            <li>
              <button onClick={handleBuy}>Куплю</button>
              {section === "BUY" && <div className={styles.toggle}></div>}
            </li>
            <li>
              <button onClick={handleSell}>Продам</button>
              {section === "SELL" && <div className={styles.toggle}></div>}
            </li>
          </ul>
          <div className={styles.separator}></div>
        </div>
      </div>
      <SelectedGoodsList categoryFilter={category && category.id} />
    </section>
  );
};

export default SelectedGoods;
