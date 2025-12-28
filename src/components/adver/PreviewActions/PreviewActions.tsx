import styles from "./PreviewActions.module.scss";

type Props = {
  onClose: () => void;
  onPublish?: () => void;
};

export const PreviewActions: React.FC<Props> = ({ onClose, onPublish }) => {
  return (
    <div className={styles.modalActions}>
      <button className={styles.editBtn} onClick={onClose}>
        Редагувати
      </button>
      <button className={styles.publishBtn} onClick={onPublish}>
        Опублікувати
      </button>
    </div>
  );
};
