import AnnouncementContactProp from "@/types/AnnouncementContactProp";
import styles from "./AnnouncementBtn.module.scss";

export default function AnnouncementBtn({ children }: AnnouncementContactProp) {
  return (
    <a href="#">
      <button className={styles.btn}>{children}</button>
    </a>
  );
}
