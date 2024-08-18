'use client';

import { FC } from "react";
// import s from "./UserPage.module.scss";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/store";
import style from './AboutMe.module.scss';

const AboutMe: FC = () => {
const user = useAppSelector(selectUser);
  return <div className={style.box}>
  <h1 className={style.headline}>Контактна інформація</h1>
    <ul>
      <li className="listItem">Телефон {user.phone}</li>
      <li className="listItem">E-mail {user.email}</li>
  </ul>
  </div>
  
};

export default AboutMe;
