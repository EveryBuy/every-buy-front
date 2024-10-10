import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./DropdownMenu.module.scss";

interface DropdownMenuType {
  status: boolean;
  changeStatus: () => void;
}

const DropdownMenu: FC<DropdownMenuType> = ({ status, changeStatus }) => {
  return (
    <ul
      className={status ? style.dropdownWrapper : "hidden"}
      onClick={changeStatus}
    >
      <li>
        <Link href="/user/about-me" className={style.nameWrapper}>
          <Image alt="alt" src="/images/user.png" width={32} height={32} />
          <p>Вікторія</p>
        </Link>
      </li>
      <li>
        <Link href="/user/about-me">Редагування профілю</Link>
      </li>
      <li>
        <Link href="/user/my-ads">Оголошення</Link>
      </li>
      <li>
        <Link href="/messages">Повідомлення</Link>
      </li>
      <li>
        <Link href="/user/selected-goods">Обрані</Link>
      </li>
      <li>
        <Link href="#">Вихід</Link>
      </li>
    </ul>
  );
};

export default DropdownMenu;
