"use client";

import { useEffect, useState } from "react";
import { CommonModal } from "@/components";
import styles from "./CategorySelectModal.module.scss";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectCategories } from "@/redux/advertisement/selectors";
import { Category } from "@/redux/advertisement/slice";
import { getCategory } from "@/redux/advertisement/operations";

interface CategorySelectModalProps {
  open: boolean;
  // categories: Category[];
  onClose: (value: boolean) => void;
  onSelect: (category: Category) => void;
}

export const CategorySelectModal = ({
  open,
  onClose,
  onSelect,
}: CategorySelectModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("");
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoryNames: string[] = categories.map((elem: Category) => elem.nameUkr);

    const [category] = categories.filter(
      (elem: Category) => elem.nameUkr === selectedCategory
    );
    const [section, setSection] = useState("SELL");
  
    useEffect(() => {
      dispatch(getCategory());
    }, [dispatch, section]);

  return (
    <CommonModal open={open} onClose={onClose}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Оберіть категорію</h3>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <button
              key={cat.categoryName}
              // className={`${styles.card} ${
              //   selected === cat.nameUkr ? styles.selected : ""
              // }`}
              onClick={() => setSelected(cat.nameUkr)}
              type="button"
            >
              <CategoryCard imageSrc={cat.photoUrl} title={cat.nameUkr} />
            </button>
          ))}
        </div>
        <button
          className={styles.confirmButton}
          onClick={() => {
            if (selected) {
              // onSelect(selected);
              onClose(false);
            }
          }}
          disabled={!selected}
          type="button"
        >
          Підтвердити
        </button>
      </div>
    </CommonModal>
  );
};
