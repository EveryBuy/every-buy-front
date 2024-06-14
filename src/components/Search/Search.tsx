import CommonIcon from "../ui/CommonIcon/CommonIcon";
import styles from "./Search.module.scss";
import CommonButton from "@/components/ui/CommonButton/CommonButton";

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <input className={styles.searchInput} placeholder="Що шукаєте?" />
          <CommonIcon
            id="icon-search"
            width="20"
            height="20"
            className={styles.searchInputIcon}
          />
        </div>
        <CommonButton
          type="submit"
          title=""
          color="yellow"
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
