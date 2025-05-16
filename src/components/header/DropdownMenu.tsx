"use client";

import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
// import { Logout } from "@/components";
import style from "./DropdownMenu.module.scss";
import Logout from "../auth/Logout/Logout";
import { selectUser } from "@/redux/auth/selectors";
// import fallback from "/public/images/user.png";

interface DropdownMenuType {
  status: boolean;
  isLoggedIn: boolean;
  changeStatus: () => void;
}

const DropdownMenu: FC<DropdownMenuType> = ({
  status,
  changeStatus,
  isLoggedIn,
}) => {
  const user = useSelector(selectUser);
  const userPictureUrl = user?.userPhotoUrl || "/images/user.png";
  const userName = user?.fullName || "";

  // resolve hydration problem
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  const handleLogout = (evt: React.MouseEvent) => {
    evt.stopPropagation();
  };

  return isLoggedIn ? (
    <ul
      className={status ? style.dropdownLoginWrapper : "hidden"}
      onClick={changeStatus}
    >
      <li>
        <Link href="/user/about-me" className={style.nameWrapper}>
          {userPictureUrl ? (
            <Image
              alt="alt"
              src={`${userPictureUrl}`}
              width={32}
              height={32}
              className={style.userPicture}
            />
          ) : (
            <span className={style.circle}></span>
          )}
          <p className={style.userName}>{userName}</p>
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
      <li onClick={handleLogout}>
        <Logout>Вихід</Logout>
      </li>
    </ul>
  ) : (
    <div
      className={status ? style.dropdownNotLoginWrapper : "hidden"}
      onClick={changeStatus}
    >
      <span className={style.circle}></span>
      <Link href="/login">Вхід</Link>
      {" / "}
      <Link href="/register">Реєстрація</Link>
    </div>
  );
};

export default DropdownMenu;
