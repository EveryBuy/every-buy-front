import React, { FC } from "react";
import { Item } from "@/components";
import { footerItems } from "../../../mock-data/footerItems";
import {
  FooterContainerMobile,
  MobilePaginationItem,
} from "./FooterMobile.styled";

const FooterMobile: FC = () => {
  return (
    <FooterContainerMobile>
      {footerItems.map(({ id, alt, text, link }) => (
        <MobilePaginationItem key={text}>
          <Item id={id} alt={alt} text={text} link={link} />
        </MobilePaginationItem>
      ))}
    </FooterContainerMobile>
  );
};

export default FooterMobile;
