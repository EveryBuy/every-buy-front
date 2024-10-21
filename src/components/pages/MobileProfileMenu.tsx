"use client";

import Link from "next/link";
import styles from "@/components/pages/MobileProfileMenu.module.scss";
import Logout from "../auth/Logout/Logout";
import { useId } from "react";
import { PROFMENU_ITEMS } from "@/constants/constants";

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

