"use client";
import { Field } from "formik";
import styles from "./AdverCheckboxGroup.module.scss";

const AdverCheckboxGroup = () => {
  return (
    <section className={styles.checkboxWrapper}>
      <div
        role="group"
        aria-labelledby="checkbox-group"
        className={styles.checkboxGroup}
      >
        <h2>
          Стан товару
          <span style={{ color: "red", marginLeft: "4px" }}>*</span>
        </h2>
        <label className={styles.checkboxLabel}>
          <Field type="checkbox" name="New" className={styles.checkboxInput} />
          Нове
        </label>
        <label className={styles.checkboxLabel}>
          <Field type="checkbox" name="Used" className={styles.checkboxInput} />
          Вживане
        </label>
      </div>

      <div
        role="group"
        aria-labelledby="checkbox-group"
        className={styles.checkboxGroup}
      >
        <h2>
          Спосіб доставки
          <span style={{ color: "red", marginLeft: "4px" }}>*</span>
        </h2>
        <label className={styles.checkboxLabel}>
          <Field
            type="checkbox"
            name="New_mail"
            className={styles.checkboxInput}
          />
          Нова пошта
        </label>
        <label className={styles.checkboxLabel}>
          <Field
            type="checkbox"
            name="Ukrposhta"
            className={styles.checkboxInput}
          />
          Укрпошта
        </label>
        <label className={styles.checkboxLabel}>
          <Field
            type="checkbox"
            name="Meest_Express"
            className={styles.checkboxInput}
          />
          Meest Express
        </label>
      </div>
    </section>
  );
};

export default AdverCheckboxGroup;
