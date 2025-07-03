"use client";

import { useEffect, useState } from "react";
import { CommonButton, CommonModal } from "@/components";
import styles from "./CategoryTreeModal.module.scss";
import { SubCategory } from "@/redux/advertisement/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getCategory,
  getTopSubCategory,
  getLowSubCategory,
} from "@/redux/advertisement/operations";
import {
  selectCategories,
  selectTopSubCategories,
  selectLowSubCategories,
} from "@/redux/advertisement/selectors";

interface CategoryTreeModalProps {
  open: boolean;
  subCategories: SubCategory[];
  onClose: () => void;
  onSelect: (value: string[]) => void;
}

export const CategoryTreeModal = ({
  open,
  onClose,
  onSelect,
}: CategoryTreeModalProps) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategories);
  const topSubCategories = useAppSelector(selectTopSubCategories);
  const lowSubCategories = useAppSelector(selectLowSubCategories);

  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [selectedTopSubCategory, setSelectedTopSubCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [selectedLowSubCategory, setSelectedLowSubCategory] = useState<string | null>(null);

  const [finalSelection, setFinalSelection] = useState<string[] | null>(null);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getTopSubCategory(selectedCategory.id));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (selectedTopSubCategory) {
      dispatch(getLowSubCategory(selectedTopSubCategory.id));
    }
  }, [selectedTopSubCategory, dispatch]);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedTopSubCategory(null);
    setSelectedLowSubCategory(null);
    setFinalSelection(null);
  };

  const handleConfirm = () => {
    if (selectedCategory && selectedTopSubCategory && selectedLowSubCategory) {
      const selection = [
        selectedCategory.name,
        selectedTopSubCategory.name,
        selectedLowSubCategory,
      ];
      setFinalSelection(selection);
      onSelect(selection);
      onClose();
      handleReset();
    }
  };

  return (
    <CommonModal open={open} onClose={onClose}>
      <div>
        <div className={styles.columns}>
          {/* Головні категорії */}
          <div className={styles.column}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.item} ${
                  selectedCategory?.id === cat.id ? styles.itemActive : ""
                } ${styles.itemWithArrow}`}
                onClick={() => {
                  setSelectedCategory({ id: cat.id, name: cat.nameUkr });
                  setSelectedTopSubCategory(null);
                  setSelectedLowSubCategory(null);
                }}
              >
                {cat.nameUkr}
              </button>
            ))}
          </div>

          {/* Топ-підкатегорії */}
          {selectedCategory && (
            <div className={styles.column}>
              {topSubCategories.map((top) => (
                <button
                  key={top.id}
                  className={`${styles.item} ${
                    selectedTopSubCategory?.id === top.id ? styles.itemActive : ""
                  } ${styles.itemWithArrow}`}
                  onClick={() => {
                    setSelectedTopSubCategory({
                      id: top.id,
                      name: top.subCategoryNameUkr,
                    });
                    setSelectedLowSubCategory(null);
                  }}
                >
                  {top.subCategoryNameUkr}
                </button>
              ))}
            </div>
          )}

          {/* Низькорівневі підкатегорії */}
          {selectedTopSubCategory && (
            <div className={styles.column}>
              {lowSubCategories.map((low) => (
                <button
                  key={low.id}
                  className={`${styles.item} ${
                    selectedLowSubCategory === low.subCategoryNameUkr
                      ? styles.itemActive
                      : ""
                  }`}
                  onClick={() => setSelectedLowSubCategory(low.subCategoryNameUkr)}
                >
                  {low.subCategoryNameUkr}
                </button>
              ))}
            </div>
          )}
        </div>

        <CommonButton
          type="submit"
          title="Підтвердити"
          color="yellow"
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={!selectedCategory || !selectedTopSubCategory || !selectedLowSubCategory}
        />
      </div>
    </CommonModal>
  );
};
