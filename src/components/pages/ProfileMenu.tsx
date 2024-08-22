import { FC } from "react";
import Link from "next/link";
import style from "./ProfileMenu.module.scss";
import Logout from "../auth/Logout/Logout";

const ProfileMenu: FC = () => {
  return (
    <nav className={style.profileMenu}>
      <ul className={style.profileList}>
        <li>
          <Link href="/user/about-me">Про мене</Link>
        </li>
        <li>
          <Link href="/user/selected-goods">Обрані товари</Link>
        </li>
        <li>
          <Link href="/user/my-ads">Мої оголошення</Link>
          <ul className={style.subMenuWrapper}>
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
        <li className={style.exitItem}>
          {/* <Link href="/user/selected-goods">Вихід</Link> */}
          <Logout >Вихід</Logout>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;
