"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Contacts.module.scss";
import { deliveryToString } from "../deliveryToString";
import setAuthToken from "@/utils/setAuthToken";
import { RootState } from "@/redux/store";
import axios from "axios";

interface ContactsProps {
  contactsInfo: {
    publicDate: string;
    cost: number;
    delivery: string[];
    title: string;
    phoneNumber?: string;
    section: string;
  };
  advertisementId: number | undefined;
}

export default function Contacts({
  contactsInfo,
  advertisementId,
}: ContactsProps) {
  const { publicDate, cost, delivery, title, phoneNumber, section } =
    contactsInfo;

  const [showNumber, setShowNumber] = useState(false);

  const sectionLabel =
    section === "SELL" ? "Продаж" : section === "BUY" ? "Купівля" : "Невідомо";

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
          <p className={styles.public}>{sectionLabel}</p>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <div>
          <p className={styles.changeWidth}>Вартість</p>
          <p className={styles.price}>{cost} грн</p>
        </div>
        <div className={styles.descVersion}>
          <div className={styles.deliveryBox}>
            <p className={styles.deliveryTitle}>Спосіб доставки</p>
            <p className={styles.text}>{deliveryToString(delivery)}</p>
          </div>
          <div className={styles.buttonsItem}>
            <CommonButton
              type="button"
              title=""
              color="transparent"
              className={styles.yellowBorderButton}
              onClick={() => sendFirstMessage(advertisementId!)}
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
