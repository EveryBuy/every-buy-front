import React, { FC } from "react";
import { CommonIcon } from "@/components";
import ItemType from "@/types/footerItemType";
import styles from '../Footer.module.scss'

const Item: FC<ItemType> = ({ id, text }) => {
  return (
   <button className={styles.mobilePaginationButton}>
      <CommonIcon id={id} width="22" height="22" />
      <span className={styles.buttonTextModile} >{text}</span>
    </button>
  );
};

export default Item;
