"use client";

import Link from "next/link";
import { Logout } from "@/components";
import { PROFMENU_ITEMS } from "@/constants/constants";
import styles from "./MobileProfileMenu.module.scss";
import { MobMenuAccordion } from "@/components/ui/MobMenuAccordion/MobMenuAccordion";

export const MobileProfileMenu = () => {
  return (
    <>
      <h4 className={styles.title}>Профіль користувача</h4>
      <nav className={styles.profileMenu}>
        <ul className={styles.profileList}>
          {PROFMENU_ITEMS.map((elem, idx) => {
            return (
              <li key={idx}>
                {!elem.submenu && <Link href={elem.href}>{elem.title}</Link>}
                {elem.submenu && <MobMenuAccordion>{elem}</MobMenuAccordion>}
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
