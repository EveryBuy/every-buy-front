"use client";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { CommonButton } from "@/components";
import CheckboxComponents from "@/components/ui/CheckboxComponents/CheckboxComponents";
import ArowDown from "@/assets/Svg/icon-chevron-arow-down.svg";
import Camera from "@/assets/Svg/camera.svg";
import styles from "./AdverMobile.module.scss";

const AdverMobile = () => {
  const initialValues = {
    product: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    location: "",
    New: false,
    Used: false,
    New_mail: false,
    Ukrposhta: false,
    Meest_Express: false,
  };

  const optionsStatus = [
    {
      name: "condition",
      value: "New",
      label: "Нове",
      inputClassName: styles.checkboxInput,
      labelClassName: styles.checkboxLabel,
    },
    {
      name: "condition",
      value: "Used",
      label: "Вживане",
      inputClassName: styles.checkboxInput,
      labelClassName: styles.checkboxLabel,
    },
  ];

  const optionsDelivery = [
    {
      name: "delivery",
      value: "New_mail",
      label: "Нова пошта",
      inputClassName: styles.checkboxInput,
      labelClassName: styles.checkboxLabel,
    },
    {
      name: "delivery",
      value: "Ukrposhta",
      label: "Укрпошта",
      inputClassName: styles.checkboxInput,
      labelClassName: styles.checkboxLabel,
    },
    {
      name: "delivery",
      value: "Meest_Express",
      label: "Meest Express",
      inputClassName: styles.checkboxInput,
      labelClassName: styles.checkboxLabel,
    },
  ];

  return (
    <div className={styles.adWrapper}>
      <ul className={styles.linkHeader}>
        <li className={styles.linkItem}>
          <p className={styles.linkItemText}>Куплю</p>
        </li>
        <li className={styles.linkItem}>
          <p className={styles.linkItemText}>Продам</p>
        </li>
      </ul>

      <h1 className={styles.adHeaderTitle}>Створити оголошення</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleBlur }) => (
          <Form autoComplete="off" className={styles.styledForm}>
            <div className={styles.wrapperInput}>
              <section className={styles.formWrapper}>
                <div>
                  <label>
                    Назва товару
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    <Field
                      className={styles.styledField}
                      type="text"
                      name="product"
                      placeholder="Вкажіть назву товару"
                      onBlur={handleBlur}
                    />
                  </label>
                </div>

                <div className={styles.fieldWrapper}>
                  <label>
                    Категорія
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    <Field
                      className={styles.styledField}
                      type="text"
                      name="category"
                      placeholder="зазначте категорію"
                      onBlur={handleBlur}
                    />
                    <button type="button" className={styles.buttonInput}>
                      <Image
                        priority
                        src={ArowDown}
                        alt="icon down"
                        width={24}
                        height={24}
                      />
                    </button>
                  </label>
                </div>

                <div className={styles.fieldWrapper}>
                  <label>
                    Підкатегорія
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    <Field
                      className={styles.styledField}
                      type="text"
                      name="subcategory"
                      placeholder="зазначте підкатегорію"
                      onBlur={handleBlur}
                    />
                    <button type="button" className={styles.buttonInput}>
                      <Image
                        priority
                        src={ArowDown}
                        alt="icon down"
                        width={24}
                        height={24}
                      />
                    </button>
                  </label>
                </div>

                <div>
                  <label>
                    Ціна
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    <Field
                      className={styles.styledField}
                      type="text"
                      name="price"
                      placeholder="Вкажіть бажану ціну"
                      onBlur={handleBlur}
                    />
                  </label>
                </div>
              </section>

              <section className={styles.checkboxWrapper}>
                <h2>
                  Стан товару
                  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                </h2>

                <CheckboxComponents
                  options={optionsStatus}
                  checkboxName="checkbox-group"
                  checkboxClassName={styles.checkboxGroup}
                />
              </section>

              <div className={styles.adventPhotoItem}>
                <Image
                  priority
                  src={Camera}
                  alt="icon down"
                  width={114}
                  height={91}
                />
                <p>Додати фото</p>
              </div>

              <div className={styles.textareaBox}>
                <label>
                  Опис товару
                  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  <Field
                    as="textarea"
                    name="description"
                    rows="4"
                    cols="50"
                    className={`${styles.styledField} ${styles.styledTexterea}`}
                  />
                  <p className={styles.textareaText}>
                    Вкажіть щонайменьше 30 символів
                  </p>
                </label>
              </div>

              <div
                className={`${styles.formWrapper} ${styles.formWrapperLocation}`}
              >
                <label>
                  Місцезнаходження
                  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  <Field
                    className={styles.styledField}
                    type="text"
                    name="location"
                    placeholder="вкажшть назву Вашого міста"
                    onBlur={handleBlur}
                  />
                </label>
              </div>

              <section className={styles.checkboxWrapper}>
                <h2>
                  Спосіб доставки
                  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                </h2>

                <CheckboxComponents
                  options={optionsDelivery}
                  checkboxName="checkbox-group"
                  checkboxClassName={styles.checkboxGroup}
                />
              </section>
            </div>

            <div className={styles.buttonWrapper}>
              <CommonButton
                type="submit"
                title="Попередній перегляд"
                color="yellow"
                className={styles.adventButton}
              />

              <CommonButton
                type="submit"
                title="Опублікувати"
                color="yellow"
                className={styles.adventButtonAd}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdverMobile;
