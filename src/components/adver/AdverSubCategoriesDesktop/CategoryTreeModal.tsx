"use client";

import { useEffect, useMemo, useState } from "react";
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
  onClose: () => void;
  onSelect: (value: {
    categoryId: number;
    topSubCategoryId: number;
    lowSubCategoryId: number;
    label: string; // "Категорія / Топ / Низ"
  }) => void;
}


function toArray<T = any>(raw: any): T[] {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (raw?.items && Array.isArray(raw.items)) {
    return raw.items;
  }
  if (raw?.data && Array.isArray(raw.data)) {
    return raw.data;
  }
  if (raw?.results && Array.isArray(raw.results)) {
    return raw.results;
  }
  return [];
}

export const CategoryTreeModal = ({
  open,
  onClose,
  onSelect,
}: CategoryTreeModalProps) => {
  const dispatch = useAppDispatch();
  const categoriesRaw = useAppSelector(selectCategories);
  const topRaw = useAppSelector(selectTopSubCategories);
  const lowRaw = useAppSelector(selectLowSubCategories);

  const categories = useMemo(() => toArray(categoriesRaw), [categoriesRaw]);
  const topSubCategories = useMemo(() => toArray(topRaw), [topRaw]);
  const lowSubCategories = useMemo(() => toArray(lowRaw), [lowRaw]);

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
    if (open) {
      dispatch(getCategory());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (selectedCategory != null) {
      dispatch(getTopSubCategory(selectedCategory.id));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    if (selectedTopSubCategory != null) {
      dispatch(getLowSubCategory(selectedTopSubCategory.id));
    }
  }, [selectedTopSubCategory, dispatch]);

  const handleLowCategoryClick = (low: { id: number; name: string }) => {
    if (selectedCategory && selectedTopSubCategory) {
      const label = `${selectedCategory.name} / ${selectedTopSubCategory.name} / ${low.name}`;
      onSelect({
        categoryId: selectedCategory.id,
        topSubCategoryId: selectedTopSubCategory.id,
        lowSubCategoryId: low.id,
        label
      });
      onClose();
    }
  };
  console.log("categories", categories);
  return (
    // <CommonModal open={open} onClose={onClose}>
    //   <div>
    //     <div className={styles.columns}>
    //       {/* Головні категорії */}
    //       <div className={styles.column}>
    //         {categories.map((category) => (
    //           <button
    //             key={category.id}
    //             className={`${styles.item} ${
    //               selectedCategory?.id === category.id ? styles.itemActive : ""
    //             }`}
    //             onClick={() => {
    //               setSelectedCategory({
    //                 id: category.id,
    //                 name: category.nameUkr,
    //               });
    //               setSelectedTopSubCategory(null);
    //             }}
    //           >
    //             <div className={styles.btnBox}>
    //               <span className={styles.label}>{category.nameUkr}</span>
    //               <Image
    //                 src={RightArrowIcon}
    //                 alt="arrow"
    //                 className={styles.arrowIcon}
    //                 width={24}
    //                 height={24}
    //               />
    //             </div>
    //           </button>
    //         ))}
    //       </div>

    //       {/* Топ-підкатегорії */}
    //       <div className={styles.column}>
    //         {selectedCategory &&
    //           topSubCategories.map((top) => (
    //             <button
    //               key={top.id}
    //               className={`${styles.item} ${
    //                 selectedTopSubCategory?.id === top.id
    //                   ? styles.itemActive
    //                   : ""
    //               }`}
    //               onClick={() => {
    //                 setSelectedTopSubCategory({
    //                   id: top.id,
    //                   name: top.subCategoryNameUkr,
    //                 });
    //                 setSelectedLowSubCategory(null);
    //               }}
    //             >
    //               <div className={styles.btnBox}>
    //                 <span className={styles.label}>
    //                   {top.subCategoryNameUkr}
    //                 </span>
    //                 <Image
    //                   src={RightArrowIcon}
    //                   alt="arrow"
    //                   className={styles.arrowIcon}
    //                   width={24}
    //                   height={24}
    //                 />
    //               </div>
    //             </button>
    //           ))}
    //       </div>

    //       {/* Низькорівневі підкатегорії */}
    //       <div className={styles.column}>
    //         {selectedTopSubCategory &&
    //           lowSubCategories.map((low) => (
    //             <button
    //               key={low.id}
    //               className={`${styles.item} ${
    //                 selectedLowSubCategory === low.subCategoryNameUkr
    //                   ? styles.itemActive
    //                   : ""
    //               }`}
    //               onClick={() => handleLowCategoryClick(low.subCategoryNameUkr)}
    //             >
    //               <div className={styles.btnBox}>
    //                 <span className={styles.label}>
    //                   {low.subCategoryNameUkr}
    //                 </span>
    //                 <Image
    //                   src={RightArrowIcon}
    //                   alt="arrow"
    //                   className={styles.arrowIcon}
    //                   width={24}
    //                   height={24}
    //                 />
    //               </div>
    //             </button>
    //           ))}
    //       </div>
    //     </div>
    //   </div>
    // </CommonModal>
    <CommonModal open={open} onClose={onClose}>
      <div>
        <div className={styles.columns}>
          {/* Категорії */}
          <div className={styles.column}>
            {categories.map((category) => {
              const isActive = selectedCategory?.id === category.id;
              return (
                <button
                  key={category.id}
                  className={`${styles.item} ${
                    isActive ? styles.itemActive : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory({
                      id: category.id,
                      name: category.nameUkr,
                    });
                    setSelectedTopSubCategory(null);
                    setSelectedLowSubCategory(null);
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
              );
            })}
          </div>

          {/* Топ-підкатегорії */}
          <div className={styles.column}>
            {selectedCategory != null &&
              topSubCategories.map((top) => {
                const isActive = selectedTopSubCategory?.id === top.id;
                return (
                  <button
                    key={top.id}
                    className={`${styles.item} ${
                      isActive ? styles.itemActive : ""
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
                );
              })}
          </div>

          {/* Низькорівневі підкатегорії */}
          <div className={styles.column}>
            {selectedTopSubCategory != null &&
              lowSubCategories.map((low) => {
                const isActive = selectedLowSubCategory?.id === low.id;
                return (
                  <button
                    key={low.id}
                    className={`${styles.item} ${
                      isActive ? styles.itemActive : ""
                    }`}
                    onClick={() => {
                      setSelectedLowSubCategory({
                        id: low.id,
                        name: low.subCategoryNameUkr,
                      });
                      handleLowCategoryClick({
                        id: low.id,
                        name: low.subCategoryNameUkr,
                      });
                    }}
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
                );
              })}
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
