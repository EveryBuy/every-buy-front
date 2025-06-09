"use client";

import { FC, useEffect, useState } from "react";
import { CommonSelect, SelectedGoodsList } from "@/components";
import { getCategory } from "@/redux/advertisement/operations";
import { selectCategories } from "@/redux/advertisement/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import s from "../UserPage.module.scss";
import styles from "./SelectedGoods.module.scss";
import CommonSectionSelector from "@/components/ui/CommonSectionSelector/CommonSectionSelector";
import { Category } from "@/redux/advertisement/slice";

const widthSize = {
  mobile: "100%",
  tablet: "230px",
  laptop: "280px",
};

export const SelectedGoods: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoryNames: string[] = categories.map(
    (elem: Category) => elem.nameUkr
  );
  categoryNames.unshift("Всі категорії");
  const [category] = categories.filter(
    (elem: Category) => elem.nameUkr === selectedCategory
  );
  const [section, setSection] = useState("SELL");

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch, section]);

  return (
    <section className={styles.SelectedGoodsContainer}>
      <h2 className={s.headline}>Мої обрані товари</h2>
      <div className={styles.selectorBox}>
        <CommonSelect
          label=""
          myLabel="Категорії"
          options={categoryNames}
          size={widthSize}
          outlineColor="var(--button)"
          value={selectedCategory}
          onChange={(evt) => setSelectedCategory(evt.target.value)}
          setSelectedCategory={setSelectedCategory}
        />
        <div style={{ paddingTop: "20px" }}>
          <CommonSectionSelector section={section} setSection={setSection} />
        </div>
      </div>
      <SelectedGoodsList
        categoryFilter={category && category.id}
        section={section}
      />
    </section>
  );
};

export default SelectedGoods;
