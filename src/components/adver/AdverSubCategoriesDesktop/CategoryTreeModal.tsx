"use client";

import { useEffect, useState } from "react";
import { CommonButton, CommonModal } from "@/components";
import styles from "./CategoryTreeModal.module.scss";
import RightArrowIcon from "@/assets/Svg/rightArrow.svg";

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
import Image from "next/image";

interface CategoryTreeModalProps {
  open: boolean;
  categories: SubCategory[];
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

  const [selectedLowSubCategory, setSelectedLowSubCategory] = useState<
    string | null
  >(null);

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

  const handleLowCategoryClick = (lowName: string) => {
    if (selectedCategory && selectedTopSubCategory) {
      const selection = [
        selectedCategory.name,
        selectedTopSubCategory.name,
        lowName,
      ];
      onSelect(selection);
      onClose();
    }
  };

  return (
    <CommonModal open={open} onClose={onClose}>
      <div>
        <div className={styles.columns}>
          {/* Головні категорії */}
          <div className={styles.column}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.item} ${
                  selectedCategory?.id === category.id ? styles.itemActive : ""
                }`}
                onClick={() => {
                  setSelectedCategory({
                    id: category.id,
                    name: category.nameUkr,
                  });
                  setSelectedTopSubCategory(null);
                }}
              >
                <div className={styles.btnBox}>
                  <span className={styles.label}>{category.nameUkr}</span>
                  <Image
                    src={RightArrowIcon}
                    alt="arrow"
                    className={styles.arrowIcon}
                    width={24}
                    height={24}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Топ-підкатегорії */}
          <div className={styles.column}>
            {selectedCategory &&
              topSubCategories.map((top) => (
                <button
                  key={top.id}
                  className={`${styles.item} ${
                    selectedTopSubCategory?.id === top.id
                      ? styles.itemActive
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTopSubCategory({
                      id: top.id,
                      name: top.subCategoryNameUkr,
                    });
                    setSelectedLowSubCategory(null);
                  }}
                >
                  <div className={styles.btnBox}>
                    <span className={styles.label}>
                      {top.subCategoryNameUkr}
                    </span>
                    <Image
                      src={RightArrowIcon}
                      alt="arrow"
                      className={styles.arrowIcon}
                      width={24}
                      height={24}
                    />
                  </div>
                </button>
              ))}
          </div>

          {/* Низькорівневі підкатегорії */}
          <div className={styles.column}>
            {selectedTopSubCategory &&
              lowSubCategories.map((low) => (
                <button
                  key={low.id}
                  className={`${styles.item} ${
                    selectedLowSubCategory === low.subCategoryNameUkr
                      ? styles.itemActive
                      : ""
                  }`}
                  onClick={() => handleLowCategoryClick(low.subCategoryNameUkr)}
                >
                  <div className={styles.btnBox}>
                    <span className={styles.label}>
                      {low.subCategoryNameUkr}
                    </span>
                    <Image
                      src={RightArrowIcon}
                      alt="arrow"
                      className={styles.arrowIcon}
                      width={24}
                      height={24}
                    />
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
