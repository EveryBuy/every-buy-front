import React, { FC } from "react";
import { Item } from "@/components";
import { footerItems } from "../../../mock-data/footerItems";
import styles from "../Footer.module.scss";

const FooterMobile: FC = () => {
  return (
    <ul className={styles.footerContainerMobile}>
      {footerItems.map(({ id, alt, text, link }) => (
        <li key={text}>
          <Item id={id} alt={alt} text={text} link={link} />
        </li>
      ))}
    </ul>
  );
};

export default FooterMobile;
