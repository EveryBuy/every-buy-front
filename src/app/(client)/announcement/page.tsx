import Contacts from "@/components/Announcement/contacts/contacts";
import Info from "@/components/Announcement/info/info";
import styles from "./announcement.module.scss";
import Seller from "@/components/Announcement/seller/seller";
import Slider from "@/components/Announcement/slider/slider";

interface Location {
  city: string;
  region: string;
}

interface ResBackend {
  description: string;
  location: Location;
  delivery: string[];
  nameUkr: string;
  online: boolean;
  linkToAllAdvert: string;
  publicDate: string;
  cost: number;
}

const resBack = {
  description:
    "Біла сукня з прінтом з голубими квітами. Розмір М. Плаття не вживане.",
  location: { city: "Київ", region: "Київська область" },
  delivery: ["Нова пошта", "Укр пошта"],
  nameUkr: "Вікторія",
  // photoUrl:
  online: true,
  linkToAllAdvert: "someLink",
  publicDate: "07.04.2024",
  cost: 1250,
};

export default function Announcement() {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <Slider />
      </li>
      <li className={styles.item}>
        <Contacts contactsInfo={resBack} />
      </li>
      <li className={styles.item}>
        <Info articleInfo={resBack} />
      </li>
      <li className={styles.item}>
        <Seller sellerInfo={resBack} />
      </li>
    </ul>
  );
}
