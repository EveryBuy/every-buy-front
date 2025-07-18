import styles from "./Spinner.module.scss";

const Spinner = () => {
  return <div className={styles.loader} aria-label="Завантаження..." />;
};

export default Spinner;
