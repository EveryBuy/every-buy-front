"use client";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { CommonButton } from "@/components";
import ArowDown from "@/assets/Svg/icon-chevron-arow-down.svg";
import styles from "./AdverDesktop.module.scss";

import { AdverPhotoList } from "@/components";

import { ErrorMessage } from "@/components";

import { FormikHelpers } from "formik";

// -----------------------------------------
import * as Yup from "yup";
// import IconError from "@/assets/Svg/icon-checkbox-error.svg";
// import IconSucces from "@/assets/Svg/icon-checkbox-success.svg";

const AdverDesktop = () => {
  const initialValues = {
    product: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
    location: "",

    condition: {
      New: false,
      Used: false,
    },
    delivery: {
      New_mail: false,
      Ukrposhta: false,
      Meest_Express: false,
    },
  };

  const AuthSchema = Yup.object().shape({
    product: Yup.string().required("Будь ласка, вкажіть назву товару"),
    price: Yup.string().required("Будь ласка, зазначте бажану ціну"),
    description: Yup.string().required("Будь ласка, додайте опис товару"),
    category: Yup.string().required("Будь ласка, зазначте категорію товару"),
    subcategory: Yup.string().required("Будь ласка, зазначте підкатегорію"),
    location: Yup.string().required("Будь ласка, вкажіть місцезнаходження"),

    condition: Yup.object()
      .shape({
        New: Yup.boolean(),
        Used: Yup.boolean(),
      })
      .test(
        "condition-test",
        "Будь ласка, оберіть стан товару",
        (value) => value.New || value.Used
      ),

    delivery: Yup.object()
      .shape({
        New_mail: Yup.boolean(),
        Ukrposhta: Yup.boolean(),
        Meest_Express: Yup.boolean(),
      })
      .test(
        "delivery-test",
        "Будь ласка, оберіть спосіб доставки",
        (value) => value.New_mail || value.Ukrposhta || value.Meest_Express
      ),
  });

  const handleSubmit = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values);
    // console.log(actions);
    actions.resetForm();
  };

  return (
    <div className={styles.adWrapper}>
      <div className={styles.adHeader}>
        <h1>Створити оголошення</h1>
        <ul className={styles.linkHeader}>
          <li className={styles.linkItem}>
            <p className={styles.linkItemText}>Куплю</p>
          </li>
          <li className={styles.linkItem}>
            <p className={styles.linkItemText}>Продам</p>
          </li>
        </ul>
        {/* </div> */}
      </div>

      <h3 className={styles.adTitle}>Подробиці товару</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={handleSubmit}
        // onSubmit={(values) => {
        //   console.log(values);
        // }}
      >
        {({ handleBlur, touched, errors }) => (
          <Form autoComplete="off" className={styles.styledForm}>
            <div className={styles.wrapperInput}>
              <section className={styles.formWrapper}>
                <div>
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

                  <ErrorMessage
                    touched={touched.product}
                    error={errors.product}
                    successMessage="Успішно вибрано стан товару"
                  />
                </div>

                <div>
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
                  <ErrorMessage
                    touched={touched.price}
                    error={errors.price}
                    successMessage="Ціна успішно додана"
                  />
                </div>

                <div>
                  <div>
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
                      <div className={styles.textareaText}>
                        <p>Вкажіть щонайменьше 30 символів</p>
                        <p>0/999</p>
                      </div>
                    </label>
                  </div>
                  <ErrorMessage
                    touched={touched.description}
                    error={errors.description}
                    successMessage="Опис товару успішно додано"
                  />
                </div>
              </section>

              <section className={styles.formWrapper}>
                <div>
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
                  <ErrorMessage
                    touched={touched.category}
                    error={errors.category}
                    successMessage="Категорія успішно додана"
                  />
                </div>

                <div>
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
                  <ErrorMessage
                    touched={touched.subcategory}
                    error={errors.subcategory}
                    successMessage="Підкатегорія успішно додана"
                  />
                </div>

                <div>
                  <div>
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
                  <ErrorMessage
                    touched={touched.location}
                    error={errors.location}
                    successMessage="Місто успішно додано"
                  />
                </div>

                <section className={styles.checkboxWrapper}>
                  <div>
                    <div
                      role="group"
                      aria-labelledby="checkbox-group"
                      className={styles.checkboxGroup}
                    >
                      <h2>
                        Стан товару
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </h2>
                      <label className={styles.checkboxLabel}>
                        <Field
                          type="checkbox"
                          name="condition.New"
                          // value="New"
                          className={styles.checkboxInput}
                        />
                        Нове
                      </label>
                      <label className={styles.checkboxLabel}>
                        <Field
                          type="checkbox"
                          // name="New"
                          name="condition.Used"
                          // value="Used"
                          className={styles.checkboxInput}
                        />
                        Вживане
                      </label>
                    </div>

                    <ErrorMessage
                      touched={touched.condition}
                      error={errors.condition}
                      successMessage="Стан товару успішно додано"
                    />

                    {/* {touched.condition &&
                    (touched.condition.New || touched.condition.Used) &&
                    errors.condition ? (
                      <div className={styles.messageError}>
                        <Image
                          src={IconError}
                          alt="Error Icon"
                          width={16}
                          height={16}
                        />
                        {errors.condition}
                      </div>
                    ) : touched.condition &&
                      (touched.condition.New || touched.condition.Used) ? (
                      <div className={styles.messageSuccess}>
                        <Image
                          src={IconSucces}
                          alt="Success Icon"
                          width={16}
                          height={16}
                        />
                        Success name
                      </div>
                    ) : null} */}
                  </div>

                  <div>
                    <div
                      role="group"
                      aria-labelledby="checkbox-group"
                      className={styles.checkboxGroup}
                    >
                      <h2>
                        Спосіб доставки
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                      </h2>
                      <label className={styles.checkboxLabel}>
                        <Field
                          type="checkbox"
                          name="delivery.New_mail"
                          // value="New_mail"
                          className={styles.checkboxInput}
                        />
                        Нова пошта
                      </label>
                      <label className={styles.checkboxLabel}>
                        <Field
                          type="checkbox"
                          name="delivery.Ukrposhta"
                          // value="Ukrposhta"
                          className={styles.checkboxInput}
                        />
                        Укрпошта
                      </label>
                      <label className={styles.checkboxLabel}>
                        <Field
                          type="checkbox"
                          name="delivery.Meest_Express"
                          // value="Meest_Express"
                          className={styles.checkboxInput}
                        />
                        Meest Express
                      </label>
                    </div>

                    <ErrorMessage
                      touched={touched.delivery}
                      error={errors.delivery}
                      successMessage="Спосіб доставки успішно додано"
                    />

                    {/* {touched.delivery &&
                    (touched.delivery.New_mail ||
                      touched.delivery.Ukrposhta ||
                      touched.delivery.Meest_Express) &&
                    errors.delivery ? (
                      <div className={styles.messageError}>
                        <Image
                          src={IconError}
                          alt="Error Icon"
                          width={16}
                          height={16}
                        />
                        {errors.delivery}
                      </div>
                    ) : touched.delivery &&
                      (touched.delivery.New_mail ||
                        touched.delivery.Ukrposhta ||
                        touched.delivery.Meest_Express) ? (
                      <div className={styles.messageSuccess}>
                        <Image
                          src={IconSucces}
                          alt="Success Icon"
                          width={16}
                          height={16}
                        />
                        Success name
                      </div>
                    ) : null} */}
                  </div>
                </section>
              </section>
            </div>

            <AdverPhotoList />

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
                className={`${styles.adventButton} ${styles.adventButtonAd}`}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdverDesktop;
