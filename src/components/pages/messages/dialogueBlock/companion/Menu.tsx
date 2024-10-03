import { FC } from "react";
import Link from "next/link";
import CommonIcon from "@/components/ui/CommonIcon/CommonIcon";
import style from "./Menu.module.scss";

interface MenuType {
  status: boolean;
  changeStatus: () => void;
}

const Menu: FC<MenuType> = ({ status, changeStatus }) => {
  return (
    <ul
      className={status ? style.menuWrapper : "hidden"}
      onClick={changeStatus}
    >
      <li>
        <Link href="#" className={style.link}>
          <CommonIcon id="icon-heart" width="20" height="19" />
          <p>Додати до обраного</p>
        </Link>
      </li>
      <li>
        <Link href="#" className={style.link}>
          <CommonIcon id="flag" width="20" height="20" />
          <p>Поскаржитись</p>
        </Link>
      </li>
      <li>
        <Link href="#" className={style.link}>
          <CommonIcon id="no-entry-sign" width="20" height="20" />
          <p>Заблокувати</p>
        </Link>
      </li>
      <li>
        <Link href="#" className={style.link}>
          <CommonIcon id="icon-bin_basket" width="20" height="20" />
          <p>Видалити</p>
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
