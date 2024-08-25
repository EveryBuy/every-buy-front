"use client";

import { FC } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/store";
import styles from "./AboutMe.module.scss";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import ArrowBack from '@/assets/Svg/arrowBack.svg';

const AboutMe: FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className={styles.box}>
      <button className={styles.arrowBackBtn} type="button">
        <Image className={styles.arrowBack} src={ArrowBack} alt="back" width={40} height={40}/>
      </button>
      <h1 className={styles.headline}>Контактна інформація</h1>
      <div className={styles.wrapper}>
        <div className={styles.userImageBox}>
          <img className={styles.userImage} alt="alt" src="/images/user.png" />
          <p className={styles.editText}>Редагувати фото</p>
        </div>
        <div className={styles.listBox}>
          <ul className={styles.list}>
            <li className={styles.listItemName}>
              {"Ім'я Прізвище" || user.name} 
              <FiEdit2 className={styles.editSvg} />
            </li>
            <li className={styles.listItem}>
              <p className="listItemText">Телефон</p>
              {user.phone}
              <FiEdit2 className={styles.editSvg} /></li>
            <li className={styles.listItem}>
              <p className="listItemText">E-mail</p>
              {user.email}
              <FiEdit2 className={styles.editSvg} /></li>
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
            <a href={"/"} className={styles.deleteLink}>Видалити мій акаунт</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
