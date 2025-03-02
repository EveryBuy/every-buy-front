"use client";

import { useState } from "react";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Contacts.module.scss";

interface ContactsProps {
  contactsInfo: {
    publicDate: string;
    cost: number;
    delivery: string[];
    title: string;
    phoneNumber?: string;
  };
}

export default function Contacts({ contactsInfo }: ContactsProps) {
  const { publicDate, cost, delivery, title, phoneNumber } = contactsInfo;

  const [showNumber, setShowNumber] = useState(false);

  return (
    <div className={styles.list}>
      <div className={styles.titleItem}>
        <CommonIcon
          id="heart"
          width="30"
          height="28"
          className={styles.favoriteSvg}
        />
        <div className={styles.publicBox}>
          <p className={styles.public}>Опубліковано {publicDate}</p>
          <p className={styles.public}>Продаж</p>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <div>
          <p className={styles.changeWidth}>Вартість</p>
          <p className={styles.price}>{cost} грн</p>
        </div>
        <div className={styles.descVersion}>
          <div>
            <p className={styles.deliveryTitle}>Спосіб доставки</p>
            <p className={styles.text}>{delivery}</p>
          </div>
          <div className={styles.buttonsItem}>
            <CommonButton
              type="button"
              title=""
              color="transparent"
              className={styles.yellowBorderButton}
            >
              Надіслати повідомлення
            </CommonButton>
            {!showNumber && (
              <CommonButton
                type="button"
                color="transparent"
                title=""
                className={styles.yellowBorderButton}
                onClick={() => setShowNumber(true)}
              >
                Показати телефон
              </CommonButton>
            )}
            {showNumber && <p className={styles.phoneNumber}>0976709876</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
