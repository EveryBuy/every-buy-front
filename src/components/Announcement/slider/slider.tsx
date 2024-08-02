import imageUrl from "../../../assets/pc.png";
import Image from "next/image";
import styles from "./slider.module.scss";

export default function Slider() {
  return <Image className={styles.image} src={imageUrl} alt="Article" />;
}
