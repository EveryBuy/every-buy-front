"use client";

import { FC } from "react";
// import s from "./UserPage.module.scss";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/store";
import styles from "./AboutMe.module.scss";
import Image from "next/image";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";

const AboutMe: FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className={styles.box}>
      <h1 className={styles.headline}>Контактна інформація</h1>
      <div className={styles.wrapper}>
        <div className={styles.userImageBox}>
          <img className={styles.userImage} alt="alt" src="/images/user.png" />
          <p className={styles.editText}>Редагувати фото</p>
        </div>
        <div className={styles.listBox}>
          <ul className={styles.list}>
            <li className={styles.listItemName}>{"Ім'я Прізвище" || user.name} 
              <FiEdit2 />
            </li>
            <li className={styles.listItem}>Телефон {user.phone}  <FiEdit2 /></li>
            <li className={styles.listItem}>E-mail {user.email}  <FiEdit2 /></li>
          <CommonButton
            type="button"
            title="Змінити пароль"
            color="transparent"
            className={styles.changePassBtn}
            />
          </ul>
          <div className={styles.deleteBox}>
            <p>Небезпечна зона</p>
            <p>Ваш профіль на EveryBuy буде видалено назавжди.</p>
            <Link href={"/"} className={styles.deleteLink}>Видалити мій акаунт</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
