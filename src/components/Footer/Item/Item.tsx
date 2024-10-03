import React, { FC } from "react";
import { CommonIcon } from "@/components";
import ItemType from "@/types/footerItemType";
// import styles from "../Footer.module.scss";
import Link from "next/link";

const Item: FC<ItemType> = ({ id, text, link }) => {
  return (
    <Link href={link}>
      <CommonIcon id={id} width="22" height="22" />
      <span>{text}</span>
    </Link>

    // <button className={styles.mobilePaginationButton}>
    //   <CommonIcon id={id} width="22" height="22" />
    //   <span>{text}</span>
    // </button>
  );
};

export default Item;
