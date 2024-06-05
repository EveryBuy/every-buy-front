import React, { FC } from "react";
import Image from "next/image";
import ItemType from "@/types/footerItemType";
import { MobilePaginationButton } from "../Footer.styled";

const Item: FC<ItemType> = ({ src, alt, text }) => {
  return (
    <MobilePaginationButton>
      <Image src={src} alt={alt} width={22} height={22} priority />
      <span>{text}</span>
    </MobilePaginationButton>
  );
};

export default Item;
