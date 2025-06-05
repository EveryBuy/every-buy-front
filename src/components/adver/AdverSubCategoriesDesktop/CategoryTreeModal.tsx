"use client";

import { useState } from "react";
import { CommonModal } from "@/components";
import styles from "./CategoryTreeModal.module.scss";

type CategoryTree = {
  [key: string]: {
    [key: string]: string[];
  };
};

const categoryTree: CategoryTree = {
  "Мода та стиль": {
    "Жіночий одяг": [
      "Боді",
      "Майки та футболки",
      "Блузи і сорочки",
      "Светри, кардигани",
      "Плаття",
      "Спідниці",
      "Верхній одяг",
      "Джинси",
      "Шорти",
      "Брюки",
      "Комбінезони",
      "Жіночі піджаки",
      "Домашній одяг",
      "Спортивний одяг",
      "Інший жіночий одяг",
    ],
    "Чоловічий одяг": [],
    "Жіноче взуття": [],
    "Чоловіче взуття": [],
    Аксесуари: [],
    "Краса та здоровʼя": [],
  },
  Електроніка: {},
  "Дім та сад": {},
  "Дитячий світ": {}
};

interface CategoryTreeModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (value: string[]) => void;
}

export const CategoryTreeModal = ({
  open,
  onClose,
  onSelect,
}: CategoryTreeModalProps) => {
  const [level1, setLevel1] = useState<string | null>(null);
  const [level2, setLevel2] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[] | null>(null);

  const handleReset = () => {
    setLevel1(null);
    setLevel2(null);
  };

  const handleSelect = (subcategory: string) => {
    setSelected([level1!, level2!, subcategory]);
  };

  const renderMain = () => (
    <div className={styles.column}>
      {Object.keys(categoryTree).map((cat) => (
        <button
          key={cat}
          onClick={() => setLevel1(cat)}
          className={`${styles.item} ${
            level1 === cat ? styles.itemActive : ""
          } ${
            Object.keys(categoryTree[cat]).length > 0
              ? styles.itemWithArrow
              : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  const renderSecond = () => {
    if (!level1) return null;
    const sub = categoryTree[level1];
    return (
      <div className={styles.column}>
        {Object.keys(sub).map((subcat) => (
          <button
            key={subcat}
            onClick={() => setLevel2(subcat)}
            className={`${styles.item} ${
              level2 === subcat ? styles.itemActive : ""
            } ${
              categoryTree[level1][subcat].length > 0
                ? styles.itemWithArrow
                : ""
            }`}
          >
            {subcat}
          </button>
        ))}
      </div>
    );
  };

  const renderThird = () => {
    if (!level1 || !level2) return null;
    const sub = categoryTree[level1][level2];
    return (
      <div className={styles.column}>
        {sub.map((last) => (
          <button
            key={last}
            onClick={() => handleSelect(last)}
            className={styles.item}
          >
            {last}
          </button>
        ))}
      </div>
    );
  };

  return (
    <CommonModal open={open} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3 className={styles.title}>Оберіть категорію</h3>
        </div>
        <div className={styles.columns}>
          {renderMain()}
          {renderSecond()}
          {renderThird()}
        </div>
        <button
          className={styles.confirmButton}
          onClick={() => {
            if (selected) {
              onSelect(selected);
              onClose();
              handleReset();
              setSelected(null);
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
