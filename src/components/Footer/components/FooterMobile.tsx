import React, { FC } from "react";
import Item from "./Item";
import { footerItems } from "../../../mock-data/footerItems";
import { FooterContainerMobile, MobilePaginationItem } from "../Footer.styled";

const FooterMobile: FC = () => {
  return (
    <FooterContainerMobile>
      {footerItems.map(({ src, alt, text }) => (
        <MobilePaginationItem key={text}>
          <Item src={src} alt={alt} text={text} />
        </MobilePaginationItem>
      ))}
    </FooterContainerMobile>
  );
};

export default FooterMobile;
