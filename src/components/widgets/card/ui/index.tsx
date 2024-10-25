/**
 * Тестова картка
 *
 * TODO: GET data from API, make decomposition and refactoring
 * @returns {JSX.Element}
 */
import styles from "./Card.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";

export function CatalogyCard() {
  return (
    <div className={styles.card}>
      <div className={styles["card-details"]}>
        <header className={styles["card-details-header"]}>
          <img
            src="https://placehold.co/180x180"
            alt="placehold image"
            className={styles["card-details-header-image"]}
          />
          <div>
            <h1 className={styles["card-details-header-title"]}>
              Name/Title/Exampledsasasas
            </h1>
            <span className={styles["card-details-header-status"]}>Нове</span>
            <h2 className={styles["card-details-header-price"]}>1280 UAH</h2>
          </div>
        </header>
        <main>
          <p className={styles["card-details-desc"]}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            quo nulla veritatis eius perspiciatis delectus est quos architecto
            placeat unde dolorum illo, quidem veniam qui cum! Libero officiis
            exercitationem quas?
          </p>
        </main>
      </div>
      <footer className={styles["card-item-2"]}>
        Вчора 21:30. Київ, Київська область
      </footer>
      <aside className={styles["card-item-3"]}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton sx={{ border: "1px solid black" }}>
          <ArrowForwardIcon />
        </IconButton>
      </aside>
    </div>
  );
}
