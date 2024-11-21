import { Contacts, Info, Seller, AnnouncementSlider } from "@/components";
// import { SliderContainer } from "@/components";
import announcement from "@/mock-data/announcement";
import styles from "./Announcement.module.scss";

export default function Announcement() {
  return (
    <div className={styles.container}>
      {/* <SliderContainer /> */}
      <AnnouncementSlider />
      <Contacts contactsInfo={announcement} />
      <Info articleInfo={announcement} />
      <Seller sellerInfo={announcement} />
    </div>
  );
}
