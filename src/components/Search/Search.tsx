import { FC } from "react";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";

const Search: FC = () => {
  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <input className={styles.searchInput} placeholder="Що шукаєте?" />
          <div className={styles.searchInputIconWrapper}>
            <CommonIcon
              id="icon-search"
              width="28"
              height="28"
              className={styles.searchInputIcon}
            />
          </div>
        </div>
        <CommonButton
          type="submit"
          title=""
          color="white"
          className={styles.searchButton}
        >
          <CommonIcon
            id="icon-search"
            width="20"
            height="20"
            className={styles.searchButtonIcon}
          />
        </CommonButton>
      </form>
    </div>
  );
};

export default Search;
