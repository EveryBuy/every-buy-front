import AnnouncementBtn from "@/components/ui/AnnouncementBtn/AnnouncementBtn";
import styles from "./contacts.module.scss";

interface Location {
  city: string;
  region: string;
}

interface ResBackend {
  delivery: string[];
  publicDate: string;
  cost: number;
}

interface ContactsProps {
  contactsInfo: ResBackend;
}

export default function Contacts({ contactsInfo }: ContactsProps) {
  const { publicDate, cost, delivery } = contactsInfo;
  return (
    <div className={styles.list}>
      <div className={styles.titleItem}>
        <div>
          <p className={styles.public}>Опубліковано {publicDate}</p>
          <h2 className={styles.title}>Стильна жіноча сукня</h2>
        </div>
        <div>
          <p className={styles.changeWidth}>Вартість</p>
          <p className={styles.price}>{cost} грн</p>
        </div>
        <div className={styles.descVersion}>
          <div>
            <p className={styles.deliveryTitle}>Спосіб доставки</p>
            <p className={styles.text}>{delivery.join(", ")}</p>
          </div>
          <div className={styles.buttonsItem}>
            <AnnouncementBtn>Надіслати повідомлення</AnnouncementBtn>
            <AnnouncementBtn>Показати телефон</AnnouncementBtn>
          </div>
        </div>
      </div>
      <div className={`${styles.buttonsItem} ${styles.mobileButtons}`}>
        <AnnouncementBtn>Надіслати повідомлення</AnnouncementBtn>
        <AnnouncementBtn>Показати телефон</AnnouncementBtn>
      </div>
      {/* <div className={styles.item}>
        <h3>Вартість</h3>
        <p>1250 грн</p>
      </div> */}
      {/* <div className={styles.item}>
        <h3>Спосіб доставки</h3>
        <p>Стильна жіноча сукня</p>
      </div> */}
    </div>
  );
}
