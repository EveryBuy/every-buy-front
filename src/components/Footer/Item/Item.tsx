import React, { FC } from "react";
import { CommonIcon } from "@/components";
import ItemType from "@/types/footerItemType";
import { MobilePaginationButton } from "./Item.styled";
import Link from "next/link";

const Item: FC<ItemType> = ({ id, text, link }) => {
  return (
    <MobilePaginationButton>
      <Link href={link}>
        <CommonIcon id={id} width="22" height="22" />
        <span>{text}</span>
      </Link>
    </MobilePaginationButton>
  );
};

export default Item;
