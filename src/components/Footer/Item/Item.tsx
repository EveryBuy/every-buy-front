import React, { FC } from "react";
import { CommonIcon } from "@/components";
import ItemType from "@/types/footerItemType";
import { MobilePaginationButton } from "./Item.styled";

const Item: FC<ItemType> = ({ id, text }) => {
  return (
    <MobilePaginationButton>
      <CommonIcon id={id} width="22" height="22" />
      <span>{text}</span>
    </MobilePaginationButton>
  );
};

export default Item;
