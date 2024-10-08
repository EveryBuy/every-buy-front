import { FC, useEffect } from "react";
import { selectUser } from "@/redux/auth/selectors";
import { useAppSelector } from "@/redux/store";
import styles from "./UserData.module.scss";
import Image from "next/image";
import pencil from "@/assets/Svg/pencil.svg";
import { useDispatch } from "react-redux";
import { refreshUser } from "@/redux/auth/operations";

type Props = {
  onEdit: () => void;
};

export const UserData: React.FC<Props> = ({ onEdit }: Props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    onEdit();
  };

  return (
    <div className={styles.listBox}>
      <ul className={styles.list}>
        <li className={styles.listItemName}>
          {user.fullName ? user.fullName : "Ім'я Прізвище"}
          <button type="button" aria-label="Edit button" onClick={handleClick}>
            <Image
              className={styles.pencil}
              src={pencil}
              alt="back"
              width={26}
              height={26}
            />
          </button>
        </li>
        <li className={styles.listItem}>
          <p className="listItemText">Телефон</p>
          {user.phone ? `+380${user.phone}` : ""}
          <button type="button" aria-label="Edit button" onClick={handleClick}>
            <Image
              className={styles.pencil}
              src={pencil}
              alt="back"
              width={26}
              height={26}
            />
          </button>
        </li>
        <li className={styles.listItem}>
          <p className="listItemText">E-mail</p>
          {user.email ? user.email : ""}
          <button type="button" aria-label="Edit button" onClick={handleClick}>
            <Image
              className={styles.pencil}
              src={pencil}
              alt="back"
              width={26}
              height={26}
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserData;
