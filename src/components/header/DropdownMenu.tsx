"use client";

import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
// import { Logout } from "@/components";
import style from "./DropdownMenu.module.scss";

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
  const userPictureUrl = useSelector(
    (state: RootState) => state.auth?.user?.userPhotoUrl
  );

  // resolve hydration problem
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

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
        {/* <Logout>Вихід</Logout> */}
        <Link href="#">Вихід</Link>
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
