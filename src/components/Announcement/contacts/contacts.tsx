import CommonIcon from "@/components/ui/CommonIcon/CommonIcon";
import styles from "./contacts.module.scss";
import CommonButton from "@/components/ui/CommonButton/CommonButton";

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
        {" "}
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
        <h2 className={styles.title}>Стильна жіноча сукня</h2>
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
            <CommonButton
              type="button"
              title=""
              color="transparent"
              className={styles.yellowBorderButton}
            >
              Надіслати повідомлення
            </CommonButton>
            <CommonButton
              type="button"
              color="transparent"
              title={""}
              className={styles.yellowBorderButton}
            >
              Показати телефон
            </CommonButton>
          </div>
        </div>
      </div>
      <div className={`${styles.buttonsItem} ${styles.mobileButtons}`}>
        <CommonButton
          type="button"
          color="transparent"
          title=""
          className={styles.yellowBorderButton}
        >
          Надіслати повідомлення
        </CommonButton>

        <CommonButton
          type="button"
          color="transparent"
          title=""
          className={styles.yellowBorderButton}
        >
          Показати телефон
        </CommonButton>
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
