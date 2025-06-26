"use client";

import { FC } from "react";
import { Item } from "@/components";
import { usePathname } from "next/navigation";
import styles from "../Footer.module.scss";

interface FooterItemProps {
  id: string;
  alt: string;
  text: string;
  link: string;
  isActive: boolean;
}

const FooterItem: FC<FooterItemProps> = ({ id, alt, text, link, isActive }) => (
  <li className={isActive ? styles.showItemIcon : styles.hiddenItemIcon}>
    <Item id={id} alt={alt} text={text} link={link} />
  </li>
);

const FooterItems: FC<{ path: string }> = ({ path }) => (
  <>
    <FooterItem
      id="icon-home-footer-mobile"
      alt="House"
      text="Головна"
      link="/"
      isActive={path === "/"}
    />
    <FooterItem
      id="icon-heart-footer-mobile"
      alt="SmallHeart"
      text="Вибране"
      link="/user/selected-goods"
      isActive={path === "/user/selected-goods"}
    />
    <FooterItem
      id={path === "#" ? "icon-create-plus-active" : "icon-create-plus-passive"}
      alt="AddIcon"
      text="Створити"
      link="#"
      isActive={path === "#"}
    />
    <FooterItem
      id={path === "/messages" ? "icon-chat-active" : "icon-chat-passive"}
      alt="Chat"
      text="Чат"
      link="/messages"
      isActive={path === "/messages"}
    />
    <FooterItem
      id={path === "/user" ? "icon-user-active" : "icon-user-passive"}
      alt="SmallUser"
      text="Профіль"
      link="/user"
      isActive={path === "/user"}
    />
  </>
);

const FooterMobile: FC = () => {
  const path = usePathname();

  return (
    <ul className={styles.footerContainerMobile}>
      <FooterItems path={path} />
    </ul>
  );
};

export default FooterMobile;

// ! prev.version
// import React, { FC } from "react";
// import { Item } from "@/components";
// import { footerItems } from "../../../mock-data/footerItems";
// import styles from "../Footer.module.scss";

// const FooterMobile: FC = () => {
//   return (
//     <ul className={styles.footerContainerMobile}>
//       {footerItems.map(({ id, alt, text, link }) => (
//         <li key={text}>
//           <Item id={id} alt={alt} text={text} link={link} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default FooterMobile;
