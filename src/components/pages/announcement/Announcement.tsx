import { Contacts, Info, Seller, AnnouncementSlider } from "@/components";
// import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
// import { SliderContainer } from "@/components";
import announcement from "@/mock-data/announcement";
import styles from "./Announcement.module.scss";

export default function Announcement() {
  // const [resData, setResData] = useState({});

  return (
    <div className={styles.container}>
      {/* <div className={styles.item}> */}
      {/* <SliderContainer /> */}
      <AnnouncementSlider />
      {/* </div> */}
      {/* <div className={styles.item}> */}
      <Contacts contactsInfo={announcement} />
      {/* </div> */}
      {/* <div className={styles.item}> */}
      <Info articleInfo={announcement} />
      {/* </div> */}
      {/* <div className={styles.item}> */}
      <Seller sellerInfo={announcement} />
      {/* </div> */}
    </div>
  );
}
