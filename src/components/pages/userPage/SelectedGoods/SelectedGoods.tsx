"use client";

import { FC, useEffect, useState } from "react";
import s from "../UserPage.module.scss";
import styles from "./SelectedGoods.module.css";
import CommonSelect from "@/components/ui/CommonSelect/CommonSelect";
import SelectedGoodsList from "./SelectedGoodsList/SelectedGoodsList";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "@/redux/advertisement/operations";
import { selectCategory } from "@/redux/advertisement/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const widthSize = {
  mobile: "0",
  tablet: "406px",
  laptop: "280px",
};

export const SelectedGoods: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);
  const categoryNames = categories.map((elem) => elem.categoryName);
  const categoryId = categories.filter(
    (elem) => elem.categoryName === selectedCategory
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  // console.log(categoryId[0].id);

  return (
    <div className={styles.SelectedGoodsContainer}>
      <h3 className={s.headline}>Мої обрані товари</h3>
      <CommonSelect
        label="Виберіть категорію"
        options={categoryNames}
        size={widthSize}
        outlineColor="var(--button)"
        value={selectedCategory}
        onChange={(evt) => setSelectedCategory(evt.target.value)}
      />
      <SelectedGoodsList />
    </div>
  );
};

export default SelectedGoods;
