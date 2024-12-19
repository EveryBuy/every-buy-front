"use client";

import { FC, useEffect, useState } from "react";
import { CommonSelect, SelectedGoodsList } from "@/components";
import { getCategory } from "@/redux/advertisement/operations";
import { selectCategories } from "@/redux/advertisement/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import s from "../UserPage.module.scss";
import styles from "./SelectedGoods.module.scss";
import CommonSectionSelector from "@/components/ui/CommonSectionSelector/CommonSectionSelector";

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
  const [section, setSection] = useState("SELL");

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch, section]);

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
        <CommonSectionSelector section={section} setSection={setSection} />
      </div>
      <SelectedGoodsList
        categoryFilter={category && category.id}
        section={section}
      />
    </section>
  );
};

export default SelectedGoods;