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

import { CategoryTreeModal } from "../AdverSubCategoriesDesktop/CategoryTreeModal";
import ToggleSwitch from "../ToggleSwitch/ToogleSwitch";

// interface FormValues {
//   topSubCategoryId: number | null;
//   lowSubCategoryId: number | null;
//   categoryId: number | null;
//   section: string;
//   cityId: number | null;
//   productType: string;
//   price: string;
//   title: string;
//   description: string;
//   deliveryMethods: string[];
//   product: string;
//   category: string;
//   subcategory: string;
//   location: string;
//   condition: string;
//   delivery: string;
// }
const AdverDesktop = () => {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [isNegotiable, setIsNegotiable] = useState(false);

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
    isNegotiable: false,
    title: "",
    description: "",
    deliveryMethods: [],
    product: "",
    category: "",
    subcategory: "",
    location: "",
    condition: "",
    delivery: "",
  };

  const [descriptionLength, setDescriptionLength] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchCategoryModalOpen, setIsSearchCategoryModalOpen] =
    useState(false);

  console.log("selectedCategory", selectedCategory);

  const AuthSchema = Yup.object().shape({
    product: Yup.string().required("Будь ласка, вкажіть назву товару"),
    price: Yup.string().required("Будь ласка, зазначте бажану ціну"),
    description: Yup.string().required("Будь ласка, додайте опис товару"),
    category: Yup.string().required("Будь ласка, зазначте категорію товару"),
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
      if (value === null || value === undefined) {
        formData.append(key, "");
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, String(item));
        });
      } else {
        formData.append(key, String(value));
      }
    });

    images.forEach((image, index) => {
      formData.append(`photos[${index}]`, image.file);
    });
    await fetch("/api/product/create", {
      method: "POST",
      body: formData,
    });
    actions.resetForm();
    setImages([]);
  };

  const handlePreview = (values: FormValues) => {
    console.log("Preview values:", values);
    // TODO: Implement preview functionality
  };

  return (
    <div className={styles.adWrapper}>
      <div className={styles.adHeader}>
        <h1>Створити оголошення</h1>
      </div>
      <div className={styles.linkItem}>
        <label className={styles.linkItemText}>
          <input
            type="radio"
            name="example"
            value="buy"
            className={styles.radio}
          />
          <span>Куплю</span>
        </label>

        <label className={styles.linkItemText}>
          <input
            type="radio"
            name="example"
            value="sell"
            className={styles.radio}
          />
          <span>Продам</span>
        </label>
      </div>

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
                  {/* фото */}
                  <AdverPhotoList images={images} setImages={setImages} />
                </section>
                <section className={styles.formWrapper}>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div>
                      {/* Назва товару */}
                      <div style={{ marginBottom: "40px" }}>
                        <label>
                          Назва товару
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                          <Field
                            className={styles.styledField}
                            type="text"
                            name="product"
                            placeholder="Вкажіть назву товару"
                            onBlur={handleBlur}
                          />
                          <div className={styles.textareaText}>
                            <p>Введіть від 16 до 70 символів</p>
                            <p>{descriptionLength}/70</p>
                          </div>
                        </label>
                        <ErrorMessage
                          touched={touched.product}
                          error={errors.product}
                          successMessage="Успішно введено назву товару"
                        />
                      </div>
                      {/* Категорія */}
                      <div className={styles.fieldWrapper}>
                        <label>
                          Категорія
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
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
                            onClick={() => setIsSearchCategoryModalOpen(true)}
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
                    </div>
                    {/* Опис */}
                    <div>
                      <label>
                        Опис товару
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
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
                          <p>{descriptionLength}/3000</p>
                        </div>
                      </label>
                      <ErrorMessage
                        touched={touched.description}
                        error={errors.description}
                        successMessage="Опис товару успішно додано"
                      />
                    </div>
                  </div>
                </section>

                <section className={styles.formWrapper}>
                  {/* Ціна */}
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div style={{}}>
                      <label>
                        Ціна
                        <span style={{ color: "red", marginLeft: "4px" }}>
                          *
                        </span>
                        <Field
                          className={styles.styledField}
                          type="text"
                          name="price"
                          placeholder="Вкажіть бажану ціну"
                          onBlur={handleBlur}
                          disabled={isNegotiable}
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

                      <div className={styles.toggleWrapper}>
                        <label className={styles.toggleLabel}>
                          <span className={styles.toggleText}>Договірна</span>
                          <ToggleSwitch
                            name="isNegotiable"
                            checked={isNegotiable}
                            onChange={(checked) => {
                              setIsNegotiable(checked);
                              setFieldValue(
                                "price",
                                checked ? "договірна" : ""
                              );
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <RadioButtonGroup
                          name="condition"
                          title="Стан товару"
                          options={[
                            { value: "New", label: "Нове" },
                            { value: "Used", label: "Вживане" },
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
                          touched={touched.condition}
                          error={errors.condition}
                          successMessage="Стан товару успішно додано"
                        />
                      </div>
                    </div>

                    {/* Місцезнаходження */}
                    <div style={{}}>
                      <div>
                        <label>
                          Місцезнаходження
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                          <Field
                            className={styles.styledField}
                            type="text"
                            name="location"
                            placeholder="вкажіть назву вашого міста"
                            onBlur={handleBlur}
                          />
                        </label>
                      </div>
                      <ErrorMessage
                        touched={touched.location}
                        error={errors.location}
                        successMessage="Місто успішно додано"
                      />

                      <div style={{ marginTop: "85px" }}>
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
                    </div>
                  </div>
                </section>
              </div>

              <div className={styles.buttonWrapper}>
                <CommonButton
                  type="button"
                  title="Попередній перегляд"
                  className={styles.adverButton}
                  onClick={() => handlePreview(values)}
                />
                <CommonButton
                  type="submit"
                  title="Опублікувати"
                  className={`${styles.adverButton} ${styles.adverButtonAd}`}
                />
              </div>
            </Form>
            {isSearchCategoryModalOpen && (
              <CategoryTreeModal
                open={isSearchCategoryModalOpen}
                onClose={() => setIsSearchCategoryModalOpen(false)}
                onSelect={(value) => {
                  const formatted = value.join(" / ");
                  setSelectedCategory(formatted);
                  setFieldValue("category", formatted);
                }}
                categories={[]}
              />
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdverDesktop;
