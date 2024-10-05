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

{
  /* <li>
            <Link href="/user/about-me">Про мене</Link>
          </li>
          <li>
            <Link href="/user/selected-goods">Обрані товари</Link>
          </li>
          <li>
            <Link href="/user/my-ads">Мої оголошення</Link>
            <ul className={styles.subMenuWrapper}>
              <li>
                <Link href="/user/my-ads/active-ads">Активні оголошення</Link>
              </li>
              <li>
                <Link href="/user/my-ads/non-active-ads">
                  Неактивні оголошення
                </Link>
              </li>
            </ul>
          </li> */
}

//   <div className={styles.exitItem}>
//   {/* <Link href="/user/selected-goods">Вихід</Link> */}
//   <Logout>Вихід</Logout>
// </div>
