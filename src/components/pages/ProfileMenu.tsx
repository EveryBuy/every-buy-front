'use client'

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ProfileMenu.module.scss";
import Logout from "../auth/Logout/Logout";
import clsx from "clsx";
import { useRouter } from 'next/router';

const ProfileMenu: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    setIsOpen(true)
  setIsMounted(true)
  }, [isMounted]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className={clsx(styles.profileMenu, styles.hidden)}>
      
      <ul className={styles.profileList} onClick={handleClick}>
        <li>
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
        </li>
      </ul>
        <div className={styles.exitItem}>
          {/* <Link href="/user/selected-goods">Вихід</Link> */}
          <Logout>Вихід</Logout>
        </div>
    </nav>
  );
};

export default ProfileMenu;
