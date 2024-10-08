"use client";

import Link from "next/link";
import styles from "@/components/pages/MobileProfileMenu.module.scss";
import Logout from "../auth/Logout/Logout";
import { useId } from "react";
import { MOBPROFMENU_ITEMS } from "@/constants/constants";

export const MobileProfileMenu = () => {
  
  return (
    <>
      <h4 className={styles.title}>Профіль користувача</h4>
      <nav className={styles.profileMenu}>
        <ul className={styles.profileList}>
          {MOBPROFMENU_ITEMS.map((el, idx) => {
            return (
              <li key={idx}>
                <Link href={el.href}>{el.title}</Link>
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

