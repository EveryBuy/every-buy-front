"use client";
import { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";

import { CommonButton } from "@/components";
import { RadioButtonGroup } from "@/components";
import { AdverPhotoList } from "@/components";
import { ErrorMessage } from "@/components";

import { FormValues } from "@/types/adverFormType";

import Search from "@/assets/Svg/search.svg";
import radioboxIcon from "@/assets/Svg/checkboxIcon.svg";
import checkIcon from "@/assets/Svg/checkIcon.svg";

import styles from "./AdverDesktop.module.scss";

// -----------------------------------------

import { ClassNames } from "@emotion/react";
import { CategorySelectModal } from "../CategorySelectModal/CategorySelectModal";
import { CategoryTreeModal } from "../AdverSubCategoriesDesktop/CategoryTreeModal";

const AdverDesktop = () => {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  // const { setFieldValue, touched, errors, handleBlur } =
  //   useFormikContext<any>();

  const initialValues: FormValues = {
    topSubCategoryId: null,
    lowSubCategoryId: null,
    categoryId: null,
    section: "",
    cityId: null,
    productType: "",
    price: "",
    title: "",
    description: "",
    deliveryMethods: [],
  };

  const [descriptionLength, setDescriptionLength] = useState(0);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  console.log("isCategoryModalOpen", isCategoryModalOpen);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  console.log("selectedSubCategory", selectedSubCategory);
  console.log("selectedCategory", selectedCategory);

  const AuthSchema = Yup.object().shape({
    product: Yup.string().required("Будь ласка, вкажіть назву товару"),
    price: Yup.string().required("Будь ласка, зазначте бажану ціну"),
    description: Yup.string().required("Будь ласка, додайте опис товару"),
    category: Yup.string().required("Будь ласка, зазначте категорію товару"),
    subcategory: Yup.string().required("Будь ласка, зазначте підкатегорію"),
    location: Yup.string().required("Будь ласка, вкажіть місцезнаходження"),

    condition: Yup.string()
      .oneOf(["New", "Used"], "Будь ласка, оберіть стан товару")
      .required("Будь ласка, оберіть стан товару"),

    delivery: Yup.string()
      .oneOf(
        ["New_mail", "Ukrposhta", "Meest_Express"],
        "Будь ласка, оберіть спосіб доставки"
      )
      .required("Будь ласка, оберіть спосіб доставки"),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((image, index) => {
      formData.append(`photos[${index}]`, image.file);
    });
    console.log(values);

    // запит
    await fetch("/api/adver", {
      method: "POST",
      body: formData,
    });

    actions.resetForm();
    setImages([]);
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
      </div>

      <h3 className={styles.adTitle}>Подробиці товару</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, touched, errors, setFieldValue, values }) => (
          <>
            <Form autoComplete="off" className={styles.styledForm}>
              <div className={styles.wrapperInput}>
                <section className={styles.formWrapper}>
                  {/* Назва товару */}
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
                    <ErrorMessage
                      touched={touched.product}
                      error={errors.product}
                      successMessage="Успішно введено назву товару"
                    />
                  </div>

                  {/* Ціна */}
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
                      <div className={styles.textareaText}>
                        <p>Використовуйте лише цифри</p>
                      </div>
                    </label>
                    <ErrorMessage
                      touched={touched.price}
                      error={errors.price}
                      successMessage="Ціна успішно додана"
                    />
                  </div>

                  {/* Опис */}
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
                        onChange={(
                          e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          setDescriptionLength(e.target.value.length);
                          setFieldValue("description", e.target.value);
                        }}
                      />
                      <div className={styles.textareaText}>
                        <p>Вкажіть щонайменше 30 символів</p>
                        <p>{descriptionLength}/999</p>
                      </div>
                    </label>
                    <ErrorMessage
                      touched={touched.description}
                      error={errors.description}
                      successMessage="Опис товару успішно додано"
                    />
                  </div>
                </section>

                <section className={styles.formWrapper}>
                  {/* Категорія */}
                  <div className={styles.fieldWrapper}>
                    <label>
                      Категорія
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                      <Field
                        className={styles.styledField}
                        type="text"
                        name="category"
                        value={values.category}
                        readOnly
                        placeholder="зазначте категорію"
                        onBlur={handleBlur}
                      />
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => setIsCategoryModalOpen(true)}
                      >
                        <Image
                          priority
                          src={Search}
                          alt="icon search"
                          width={24}
                          height={24}
                        />
                      </button>
                    </label>
                    <ErrorMessage
                      touched={touched.category}
                      error={errors.category}
                      successMessage="Категорія успішно додана"
                    />
                  </div>

                  {/* Підкатегорія */}
                  <div className={styles.fieldWrapper}>
                    <label>
                      Підкатегорія
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                      <Field
                        className={styles.styledField}
                        type="text"
                        name="subcategory"
                        value={values.subcategory}
                        readOnly
                        placeholder="зазначте підкатегорію"
                        onBlur={handleBlur}
                      />
                      <button
                        type="button"
                        className={styles.buttonInput}
                        onClick={() => setIsSubCategoryModalOpen(true)}
                      >
                        <Image
                          priority
                          src={Search}
                          alt="icon search"
                          width={24}
                          height={24}
                        />
                      </button>
                    </label>
                    <ErrorMessage
                      touched={touched.subcategory}
                      error={errors.subcategory}
                      successMessage="Підкатегорія успішно додана"
                    />
                  </div>

                  {/* Місцезнаходження */}
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
                    <ErrorMessage
                      touched={touched.location}
                      error={errors.location}
                      successMessage="Місто успішно додано"
                    />
                  </div>

                  {/* Радіо кнопки */}
                  <section className={styles.radioboxWrapper}>
                    <div>
                      <RadioButtonGroup
                        name="condition"
                        title="Стан товару"
                        options={[
                          { value: "New", label: "Нове" },
                          { value: "Used", label: "Вживане" },
                        ]}
                        groupClass={styles.radioboxGroup}
                        labelClass={`${styles.radioboxLabel} ${styles.check}`}
                        inputClass={`${styles.visuallyHidden} ${styles.radioboxInput}`}
                        radioBoxClass={styles.radioBox}
                        radioUncheckedClass={styles.radioUnchecked}
                        radioCheckedClass={styles.radioChecked}
                        uncheckedIcon={radioboxIcon}
                        checkedIcon={checkIcon}
                      />
                      <ErrorMessage
                        touched={touched.condition}
                        error={errors.condition}
                        successMessage="Стан товару успішно додано"
                      />
                    </div>
                    <div>
                      <RadioButtonGroup
                        name="delivery"
                        title="Спосіб доставки"
                        options={[
                          { value: "New_mail", label: "Нова пошта" },
                          { value: "Ukrposhta", label: "Укрпошта" },
                          { value: "Meest_Express", label: "Meest Express" },
                          { value: "Other", label: "Інше" },
                        ]}
                        groupClass={styles.radioboxGroup}
                        labelClass={`${styles.radioboxLabel} ${styles.check}`}
                        inputClass={`${styles.visuallyHidden} ${styles.radioboxInput}`}
                        radioBoxClass={styles.radioBox}
                        radioUncheckedClass={styles.radioUnchecked}
                        radioCheckedClass={styles.radioChecked}
                        uncheckedIcon={radioboxIcon}
                        checkedIcon={checkIcon}
                      />
                      <ErrorMessage
                        touched={touched.delivery}
                        error={errors.delivery}
                        successMessage="Спосіб доставки успішно додано"
                      />
                    </div>
                  </section>
                </section>
              </div>

              <AdverPhotoList images={images} setImages={setImages} />

              <div className={styles.buttonWrapper}>
                <CommonButton
                  type="submit"
                  title="Попередній перегляд"
                  color="yellow"
                  className={styles.adverButton}
                />
                <CommonButton
                  type="submit"
                  title="Опублікувати"
                  color="yellow"
                  className={`${styles.adverButton} ${styles.adverButtonAd}`}
                />
              </div>
            </Form>
            {isCategoryModalOpen && (
              <CategorySelectModal
                open={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onSelect={(value) => {
                  setSelectedCategory(value.nameUkr);
                  setFieldValue("category", value.nameUkr);
                }}
                categories={[]}
              />
            )}
            {isSubCategoryModalOpen && (
              <CategoryTreeModal
                open={isSubCategoryModalOpen}
                onClose={() => setIsSubCategoryModalOpen(false)}
                onSelect={(value) => {
                  const formatted = value.join(" / ");
                  setSelectedSubCategory(formatted);
                  setFieldValue("subcategory", formatted);
                }}
                subCategories={[]}
              />
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdverDesktop;
