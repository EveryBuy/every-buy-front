"use client";

import { Field } from "formik";
import styles from "./SectionSwitch.module.scss";

const SectionSwitch = () => {
  return (
    <div className={`${styles.linkItem} ${styles.sellBox}`}>
      <label className={styles.linkItemText}>
        <Field
          type="radio"
          name="section"
          value="BUY"
          className={styles.radio}
        />
        <span className={styles.labelText}>Куплю</span>
      </label>

      <label className={styles.linkItemText}>
        <Field
          type="radio"
          name="section"
          value="SELL"
          className={styles.radio}
        />
        <span className={styles.labelText}>Продам</span>
      </label>
    </div>
  );
};

export default SectionSwitch;
