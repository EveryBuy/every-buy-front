"use client";

import { useEffect, useState } from "react";
import { CommonButton, CommonModal } from "@/components";
import styles from "./CategorySelectModal.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectCategories } from "@/redux/advertisement/selectors";
import { Category } from "@/redux/advertisement/slice";
import { getCategory } from "@/redux/advertisement/operations";
import CardSelectCatalogy from "@/components/Catalogy/cardCatalogy/CardSelectCatalogy/CardSelectCatalogy";

interface CategorySelectModalProps {
  open: boolean;
  categories: Category[];
  onClose: (value: boolean) => void;
  onSelect: (category: Category) => void;
}

export const CategorySelectModal = ({
  open,
  onClose,
  onSelect,
}: CategorySelectModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <CommonModal open={open} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.listItem} ${
                selected === cat.nameUkr ? styles.selected : ""
              }`}
              onClick={() => setSelected(cat.nameUkr)}
              type="button"
            >
              <CardSelectCatalogy photoUrl={cat.photoUrl} title={cat.nameUkr} selected={selected === cat.nameUkr}/>
            </button>
          ))}
        </div>
        <CommonButton
          type="submit"
          title="Підтвердити"
          color="yellow"
          className={styles.confirmButton}
          onClick={() => {
            if (selected) {
              const foundCategory = categories.find(
                (cat) => cat.nameUkr === selected
              );
              if (foundCategory) {
                onSelect(foundCategory);
                onClose(false);
              }
            }
          }}
          disabled={!selected}
        />
      </div>
    </CommonModal>
  );
};
