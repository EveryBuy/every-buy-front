import Contacts from "@/components/Announcement/contacts/contacts";
import Info from "@/components/Announcement/info/info";
import styles from "./announcement.module.scss";
import Seller from "@/components/Announcement/seller/seller";
// import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
// import { useState } from "react";
import announcement from "@/mock-data/announcement";
import AnnouncementSlider from "@/components/Announcement/slider/slider";
// import { SliderContainer } from "@/components";

export default function Announcement() {
  // const [resData, setResData] = useState({});

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          {/* <SliderContainer /> */}
          <AnnouncementSlider />
        </div>
        <div className={styles.item}>
          <Contacts contactsInfo={announcement} />
        </div>
        <div className={styles.item}>
          <Info articleInfo={announcement} />
        </div>
        <div className={styles.item}>
          <Seller sellerInfo={announcement} />
        </div>
      </div>
    </>
  );
}
