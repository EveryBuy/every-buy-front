"use client";

import { FC } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import styles from "./AboutMe.module.scss";
import CommonButton from "@/components/ui/CommonButton/CommonButton";
import Image from "next/image";
import ArrowBack from "@/assets/Svg/arrowBack.svg";
import pencil from "@/assets/Svg/pencil.svg";
import separeteLine from "@/assets/Svg/separeteLine.svg";

import { useRouter } from "next/navigation";
import { toggleProfileMenu } from "@/redux/ui/slice";
import Link from "next/link";
import DeleteAccount from "@/components/auth/DeleteAccount/DeleteAccount";

const AboutMe: FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    router.replace("/user/");
    dispatch(toggleProfileMenu(false));
  };
  return (
    <div className={styles.box}>
      <button
        className={styles.arrowBackBtn}
        type="button"
        onClick={handleClick}
      >
        <Image
          className={styles.arrowBack}
          src={ArrowBack}
          alt="back"
          width={40}
          height={40}
        />
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
              <Image
                className={styles.pencil}
                src={pencil}
                alt="back"
                width={26}
                height={26}
              />
            </li>
            <li className={styles.listItem}>
              <p className="listItemText">Телефон</p>
              {user.phone}
              <Image
                className={styles.pencil}
                src={pencil}
                alt="back"
                width={26}
                height={26}
              />
            </li>
            <li className={styles.listItem}>
              <p className="listItemText">E-mail</p>
              {user.email}
              <Image
                className={styles.pencil}
                src={pencil}
                alt="back"
                width={26}
                height={26}
              />
            </li>
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
            <Image
              className={styles.separeteLine}
              src={separeteLine}
              alt="separete"
            />
            {/* <Link href={"/"} className={styles.deleteLink}>
            </Link> */}
            <DeleteAccount>Видалити мій акаунт</DeleteAccount>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
