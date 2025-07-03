import { useState } from "react";
import styles from "./CardSelectCatalogy.module.scss";
import Image from "next/image";

type CardSelectCatalogyProps = {
  photoUrl: string;
  title: string;
  selected?: boolean;
  onClick?: () => void;
};


const CardSelectCatalogy = ({ photoUrl, title, selected }: CardSelectCatalogyProps) => {
  return (
    <div
      className={`${styles.listItem} ${selected ? styles.selected : ""}`}>
      <Image
        className={styles.listItemImage}
        src={photoUrl}
        alt={title}
        width={98}
        height={98}
        style={{ objectFit: "cover" }}
      />
      <p className={styles.listItemText}>{title}</p>
    </div>
  );
};

export default CardSelectCatalogy;
