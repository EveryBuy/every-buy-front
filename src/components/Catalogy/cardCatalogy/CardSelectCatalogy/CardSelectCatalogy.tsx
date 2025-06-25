import styles from "./CardSelectCatalogy.module.scss";
import Image from "next/image";

interface CardSelectCatalogyProps {
  photoUrl: string;
  title: string;
}

const CardSelectCatalogy = ({ photoUrl, title }: CardSelectCatalogyProps) => {
  return (
    <div className={styles.listItem}>
      <Image
        className={styles.listItemImage}
        src={photoUrl}
        alt={title}
        width={98}
        height={98}
        style={{ objectFit: "cover" }}
      />
      <p className={styles.listItemText}>{title}</p>
    </div>
  );
};

export default CardSelectCatalogy;
