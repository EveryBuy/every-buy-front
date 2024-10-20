"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ProfileMenu.module.scss";
import Logout from "../auth/Logout/Logout";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PROFMENU_ITEMS } from "@/constants/constants";

const ProfileMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={clsx(styles.profileMenu, styles.hidden)}>
      <div className={styles.wrapper}>
        <ul className={styles.profileList} onClick={handleClick}>
          {PROFMENU_ITEMS.map((elem, idx) => {
            return (
              <li key={idx} className={styles.profileListItem}>
                <Link href={elem.href} className={styles.itemLink}>
                  <p>{elem.title}</p>
                  {isActive(elem.href) && <div className={styles.marker}></div>}
                </Link>
                {elem.submenu && (
                  <ul className={styles.subMenu}>
                    {elem.submenuItems?.map((el, index) => (
                      <li key={index}>
                        <Link href={el.href} className={styles.subItemLink}>
                          <p>{el.title}</p>
                          {isActive(el.href) && (
                            <div className={styles.marker}></div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        <Logout>Вихід</Logout>
      </div>
      <div className={styles.devider}></div>
    </nav>
  );
};

export default ProfileMenu;

{
  /* <li className={styles.profileListItem}>
            <Link href="/user/selected-goods">Обрані товари</Link>
            {isActive("/user/selected-goods") && (
              <div className={styles.marker}></div>
            )}
          </li>
          <li className={styles.profileListItem}>
            <Link href="/user/my-ads">Мої оголошення</Link>
            {isActive("/user/my-ads") && <div className={styles.marker}></div>}
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
