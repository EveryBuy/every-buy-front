import styles from "./DescriptionPreview.module.scss";

type Props = {
  description?: string;
};

const DescriptionPreview: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.descriptionWrapper}>
      <p className={styles.descriptionTitle}>Опис</p>

      {description ? (
        <textarea
          className={styles.descriptionReadonly}
          value={description}
          readOnly
        />
      ) : (
        <div className={styles.empty}>
          Опис не додано
        </div>
      )}
    </div>
  );
};

export default DescriptionPreview;
