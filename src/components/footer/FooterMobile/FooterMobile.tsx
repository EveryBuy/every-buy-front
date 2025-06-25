"use client";

import { FC } from "react";
import { Item } from "@/components";
import { usePathname } from "next/navigation";
import styles from "../Footer.module.scss";

const FooterMobile: FC = () => {
  const path = usePathname();

  return (
    <ul className={styles.footerContainerMobile}>
      {path === "/" ? (
        <li className={styles.showItemIcon}>
          <Item id={"icon-home"} alt={"House"} text={"Головна"} link={"/"} />
        </li>
      ) : (
        <li className={styles.hiddenItemIcon}>
          <Item id={"icon-home"} alt={"House"} text={"Головна"} link={"/"} />
        </li>
      )}
      {path === "/user/selected-goods" ? (
        <li className={styles.showItemIcon}>
          <Item
            id={"icon-heart"}
            alt={"SmallHeart"}
            text={"Вибране"}
            link={"/user/selected-goods"}
          />
        </li>
      ) : (
        <li className={styles.hiddenItemIcon}>
          <Item
            id={"icon-heart"}
            alt={"SmallHeart"}
            text={"Вибране"}
            link={"/user/selected-goods"}
          />
        </li>
      )}
      {/* TODO: */}
      {path === "#" ? (
        <li className={styles.showItemIcon}>
          <Item
            id={"icon-create-plus-active"}
            alt={"AddIcon"}
            text={"Створити"}
            // TODO:
            link={"#"}
          />
        </li>
      ) : (
        <li className={styles.hiddenItemIcon}>
          <Item
            id={"icon-create-plus-passive"}
            alt={"AddIcon"}
            text={"Створити"}
            // TODO:
            link={"#"}
          />
        </li>
      )}
      {path === "/messages" ? (
        <li className={styles.showItemIcon}>
          <Item
            id={"icon-chat-active"}
            alt={"Chat"}
            text={"Чат"}
            link={"/messages"}
          />
        </li>
      ) : (
        <li className={styles.hiddenItemIcon}>
          <Item
            id={"icon-chat-passive"}
            alt={"Chat"}
            text={"Чат"}
            link={"/messages"}
          />
        </li>
      )}
      {path === "/user" ? (
        <li className={styles.showItemIcon}>
          <Item
            id={"icon-user-active"}
            alt={"SmallUser"}
            text={"Профіль"}
            link={"/user"}
          />
        </li>
      ) : (
        <li className={styles.hiddenItemIcon}>
          <Item
            id={"icon-user-passive"}
            alt={"SmallUser"}
            text={"Профіль"}
            link={"/user"}
          />
        </li>
      )}
    </ul>
  );
};

export default FooterMobile;

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
