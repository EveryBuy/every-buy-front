import { FC } from "react";
import Link from "next/link";
import CommonIcon from "@/components/ui/CommonIcon/CommonIcon";
import style from "./Menu.module.scss";

interface MenuType {
  status: boolean;
  changeStatus: () => void;
  deleteChatWindowHandle: (() => void) | undefined;
  blockUserWindowHandle: (() => void) | undefined;
}

const Menu: FC<MenuType> = ({
  status,
  changeStatus,
  deleteChatWindowHandle,
  blockUserWindowHandle,
}) => {
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
          <CommonIcon id="folder" width="20" height="19" />
          <p>Додати до архіву</p>
        </Link>
      </li>
      <li>
        <Link href="#" className={style.link}>
          <CommonIcon id="flag" width="20" height="20" />
          <p>Поскаржитись</p>
        </Link>
      </li>
      <li>
        <p className={style.link} onClick={blockUserWindowHandle}>
          <CommonIcon id="no-entry-sign" width="20" height="20" />
          Заблокувати
        </p>
      </li>
      <li>
        <p className={style.link} onClick={deleteChatWindowHandle}>
          <CommonIcon id="icon-bin_basket" width="20" height="20" />
          Видалити
        </p>
      </li>
    </ul>
  );
};

export default Menu;
