import Contacts from "@/components/Announcement/contacts/contacts";
import Info from "@/components/Announcement/info/info";
import styles from "./announcement.module.scss";
import Seller from "@/components/Announcement/seller/seller";
// import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
import { useState } from "react";
import announcement from "@/mock-data/announcement";
import AnnouncementSlider from "@/components/Announcement/slider/slider";

export default function Announcement() {
  // const [resData, setResData] = useState({});

  return (
    <section>
      <ul className={styles.container}>
        <li className={styles.item}>
          {/* <SliderContainer /> */}
          <AnnouncementSlider />
        </li>
        <li className={styles.item}>
          <Contacts contactsInfo={announcement} />
        </li>
        <li className={styles.item}>
          <Info articleInfo={announcement} />
        </li>
        <li className={styles.item}>
          <Seller sellerInfo={announcement} />
        </li>
      </ul>
    </section>
  );
}
