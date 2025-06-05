"use client";

import { useState } from "react";
import { CommonModal } from "@/components";
import styles from "./CategorySelectModal.module.scss";
import { CategoryCard } from "../CategoryCard/CategoryCard";

const categories = [
  { title: "Допомога", img: "/images/electronics.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Допомога", img: "/images/electronics.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Допомога", img: "/images/electronics.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" },
  { title: "Одяг", img: "/images/clothes.jpg" }
];


interface CategorySelectModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onSelect: (category: string) => void;
}

export const CategorySelectModal = ({
  open,
  onClose,
  onSelect,
}: CategorySelectModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <CommonModal open={open} onClose={onClose}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Оберіть категорію</h3>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <button
              key={cat.title}
              className={`${styles.card} ${
                selected === cat.title ? styles.selected : ""
              }`}
              onClick={() => setSelected(cat.title)}
              type="button"
            >
              <CategoryCard imageSrc={cat.img} title={cat.title} />
            </button>
          ))}
        </div>
        <button
          className={styles.confirmButton}
          onClick={() => {
            if (selected) {
              onSelect(selected);
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
