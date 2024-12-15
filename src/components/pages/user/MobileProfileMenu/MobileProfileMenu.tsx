"use client";

import Link from "next/link";
import { Logout } from "@/components";
import { PROFMENU_ITEMS } from "@/constants/constants";
import styles from "./MobileProfileMenu.module.scss";

export const MobileProfileMenu = () => {
  return (
    <>
      <h4 className={styles.title}>Профіль користувача</h4>
      <nav className={styles.profileMenu}>
        <ul className={styles.profileList}>
          {PROFMENU_ITEMS.map((elem, idx) => {
            return (
              <li key={idx}>
                <Link href={elem.href}>{elem.title}</Link>
              </li>
            );
          })}
        </ul>
        <Logout>Вихід</Logout>
      </nav>
    </>
  );
};

export default MobileProfileMenu;
