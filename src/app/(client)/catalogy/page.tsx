/**
 *  Catalogy component that returns the layout of catalogy page
 *
 * @returns {JSX.Element} - return a TSX element which have a layout structure
 */
// import styles from "./Catalogy.module.scss";

// import { CatalogyFilter } from "@components/features/catalogyFilter";

import { CatalogyCard } from "@components/widgets/card";
import { CatalogyFilter } from "@components/features/catalogyFilter";

import styles from "./Catalogy.module.scss";

function Catalogy() {
  return (
    <>
      <CatalogyFilter />
      <section className={styles["catalog-container"]}>
        <CatalogyCard />
        <CatalogyCard />
        <CatalogyCard />
      </section>
    </>
  );
}

export default Catalogy;
