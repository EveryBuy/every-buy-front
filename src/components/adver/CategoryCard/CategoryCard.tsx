import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  imageSrc: string;
  title: string;
}

export const CategoryCard = ({ imageSrc, title }: CategoryCardProps) => (
  <div className={styles.card}>
    <div className={styles.corner} />
    <div className={styles.imageWrapper}>
      {/* <image src={imageSrc} alt={title} /> */}
    </div>
    <div className={styles.title}>{title}</div>
  </div>
);
