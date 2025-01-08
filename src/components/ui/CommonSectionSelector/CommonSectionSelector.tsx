"use client";

import { FC } from "react";
import styles from "./CommonSectionSelector.module.css";

type Props = {
  section: string;
  setSection: (section: string) => void;
};

export const CommonSectionSelector: FC<Props> = ({ section, setSection }) => {
  const handleBuy = () => {
    setSection("BUY");
  };

  const handleSell = () => {
    setSection("SELL");
  };

  return (
    <section className={styles.sectionContainer}>
      <ul className={styles.buttonList}>
        <li>
          <button onClick={handleBuy}>Куплю</button>
          {section === "BUY" && <div className={styles.toggle}></div>}
        </li>
        <li>
          <button onClick={handleSell}>Продам</button>
          {section === "SELL" && <div className={styles.toggle}></div>}
        </li>
      </ul>
      <div className={styles.separator}></div>
    </section>
  );
};

export default CommonSectionSelector;
