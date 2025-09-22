import styles from "./CategoryCard.module.scss";
import Image from "next/image";


interface CategoryCardProps {
  imageSrc: string;
  title: string;
}

export const CategoryCard = ({ imageSrc, title }: CategoryCardProps) => (
  <div className={styles.card}>
    <div className={styles.corner} />
    <div className={styles.imageWrapper}>
      <Image
        src={imageSrc}
        alt={title}
        width={98}
        height={98}
        className={styles.img}
      />
    </div>
    <div className={styles.title}>{title}</div>
  </div>
);