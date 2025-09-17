"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";

import { CommonButton } from "@/components";
import { RadioButtonGroup } from "@/components";
import { AdverPhotoList } from "@/components";
import { ErrorMessage } from "@/components";
import Search from "@/assets/Svg/search.svg";
import radioboxIcon from "@/assets/Svg/checkboxIcon.svg";
import checkIcon from "@/assets/Svg/checkIcon.svg";

import styles from "./AdverDesktop.module.scss";

// -----------------------------------------

import { CategoryTreeModal } from "../AdverSubCategoriesDesktop/CategoryTreeModal";
import ToggleSwitch from "../ToggleSwitch/ToogleSwitch";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createAdvertisement } from "@/redux/advertisement/operations";
import { selectToken } from "@/redux/auth/selectorsAuth";
import CityAutocomplete from "../CityAutocomplete/CityAutocomplete";
import AdverPreviewModal from "../AdverPreviewModal/AdverPreviewModal";

export type FormValues = {
  topSubCategoryId: number | null;
  lowSubCategoryId: number | null;
  categoryId: number | null;
  section: "SELL" | "BUY";
  cityId: number | null;
  productType: "NEW" | "USED" | "OTHER" | "";
  price: string | null;
  isNegotiable: boolean;
  title: string;
  description: string;
  deliveryMethods: string[];
  product: string;
  category: string;
  subcategory: string;
  location: string;
  condition: "NEW" | "USED" | "OTHER" | "";
  delivery: string;
};

const initialValues: FormValues = {
  topSubCategoryId: null,
  lowSubCategoryId: null,
  categoryId: null,
  section: "SELL",
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

const AuthSchema = Yup.object().shape({
  product: Yup.string()
    .trim()
    .min(2, "Мінімум 2 символи")
    .max(70, "Максимум 70 символів")
    .required("Будь ласка, вкажіть назву товару"),
  price: Yup.string()
    .nullable()
    .when("isNegotiable", {
      is: false,
      then: (s) =>
        s
          .required("Будь ласка, зазначте бажану ціну")
          .matches(/^\d+$/, "Використовуйте лише цифри")
          .test("min-1", "Мінімум 1", (v) => {
            if (v == null || v === "") {
              return false;
            }
            return Number(v) >= 1;
          }),
      otherwise: (s) => s.nullable().notRequired(),
    }),

  description: Yup.string()
    .trim()
    .min(30, "Вкажіть щонайменше 30 символів")
    .max(3000, "Максимум 3000 символів")
    .required("Будь ласка, додайте опис товару"),
  categoryId: Yup.number()
    .typeError("Будь ласка, зазначте категорію товару")
    .required("Будь ласка, зазначте категорію товару"),
  location: Yup.string()
    .trim()
    .required("Будь ласка, вкажіть місцезнаходження"),
  condition: Yup.mixed<"NEW" | "USED" | "OTHER">()
    .oneOf(["NEW", "USED", "OTHER"], "Будь ласка, оберіть стан товару")
    .required("Будь ласка, оберіть стан товару"),
  // delivery: Yup.string()
  //   .oneOf(
  //     ["New_mail", "Ukrposhta", "Meest_Express"],
  //     "Будь ласка, оберіть спосіб доставки"
  //   )
  //   .required("Будь ласка, оберіть спосіб доставки"),
  section: Yup.mixed<"SELL" | "BUY">().oneOf(["SELL", "BUY"]).required(),
  // productType: Yup.string()
  //   .oneOf(["NEW", "USED", "OTHER"])
  //   .required("Оберіть тип товару"),
});

function FormSyncers() {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  //   // (2) delivery -> deliveryMethods
  useEffect(() => {
    const methods = values.delivery ? [values.delivery] : [];
    setFieldValue("deliveryMethods", methods, false);
  }, [values.delivery, setFieldValue]);

  //   // (3) condition -> productType
  useEffect(() => {
    if (values.condition && values.productType !== values.condition) {
      setFieldValue("productType", values.condition, false);
    }
  }, [values.condition, values.productType, setFieldValue]);

  return null;
}

const AdverDesktop = () => {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);


  const [previewOpen, setPreviewOpen] = useState(false);


  const handlePreview = (values: FormValues) => {
    console.log("Preview values:", values);
    setPreviewOpen(true);
  };
  // всередині компонента
  async function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    try {
      if (!token) {
        console.error("No token provided");
        return;
      }

      // Only fields expected by backend
      const requestPayload = {
        topSubCategoryId: values.topSubCategoryId,
        lowSubCategoryId: values.lowSubCategoryId,
        section: values.section,
        cityId: values.cityId,
        productType: values.productType || values.condition, // fallback, якщо обирається через condition
        price: values.price ? Number(values.price) : null,
        title: values.title || values.product || "",
        isNegotiable: Boolean(values.isNegotiable),
        categoryId: values.categoryId,
        description: values.description,
        deliveryMethods: Array.isArray(values.deliveryMethods)
          ? values.deliveryMethods.filter(Boolean)
          : values.delivery
          ? [values.delivery]
          : [],
      };

      const formData = new FormData();
      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
      );
      images.forEach(({ file }) => formData.append("photos", file));

      await dispatch(createAdvertisement(formData)).unwrap();

      actions.resetForm();
      setImages([]);
    } catch (e) {
      console.error("Create advert failed:", e);
    } finally {
      actions.setSubmitting(false);
    }
  }
  const submitRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.adWrapper}>
      <div className={styles.adHeader}>
        <h1>Створити оголошення</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, touched, errors, setFieldValue, values }) => (
          <>
            <FormSyncers />
            <Form autoComplete="off" className={styles.styledForm}>
              <div className={styles.linkItem}>
                <label className={styles.linkItemText}>
                  <Field
                    type="radio"
                    name="section"
                    value="BUY"
                    className={styles.radio}
                  />
                  <span>Куплю</span>
                </label>

                <label className={styles.linkItemText}>
                  <Field
                    type="radio"
                    name="section"
                    value="SELL"
                    className={styles.radio}
                  />
                  <span>Продам</span>
                </label>
              </div>
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
                            onBlur={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleBlur(e);
                              const trimmed = (e.target.value || "").trim();
                              if (trimmed && !values.title) {
                                setFieldValue("title", trimmed);
                              }
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const v = e.target.value;
                              setFieldValue("product", v);
                              setDescriptionLength(
                                v.length > 70 ? 70 : v.length
                              );
                            }}
                          />
                          <div className={styles.textareaText}>
                            <p>Введіть від 16 до 70 символів</p>
                            <p>{Math.min(descriptionLength, 70)}/70</p>
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
                            onClick={() => setCategoryModalOpen(true)}
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
                          touched={touched.categoryId}
                          error={errors.categoryId}
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
                            setFieldValue("description", e.target.value);
                          }}
                        />
                        <div className={styles.textareaText}>
                          <p>Вкажіть щонайменше 30 символів</p>
                          <p>{(values.description || "").length}/3000</p>
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
                          disabled={values.isNegotiable}
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
                            checked={values.isNegotiable}
                            onChange={(checked) => {
                              setFieldValue("isNegotiable", checked);
                              if (checked) {
                                setFieldValue("price", "");
                              }
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <RadioButtonGroup
                          name="condition"
                          title="Стан товару"
                          options={[
                            { value: "NEW", label: "Нове" },
                            { value: "USED", label: "Вживане" },
                            { value: "OTHER", label: "Інше" },
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
                          <CityAutocomplete
                            nameField="location"
                            idField="cityId"
                            placeholder="введіть місто (мін. 3 символи)"
                            minLength={3}
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
                            { value: "NOVA_POST", label: "Нова пошта" },
                            { value: "UKR_POST", label: "Укрпошта" },
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
              {/* прихована кнопка сабміту */}
              <button type="submit" ref={submitRef} style={{ display: "none" }}>
                Сабміт
              </button>
            </Form>
            {categoryModalOpen && (
              <CategoryTreeModal
                open={categoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onSelect={({
                  categoryId,
                  topSubCategoryId,
                  lowSubCategoryId,
                  label,
                }) => {
                  setFieldValue("categoryId", categoryId);
                  setFieldValue("topSubCategoryId", topSubCategoryId);
                  setFieldValue("lowSubCategoryId", lowSubCategoryId);
                  setFieldValue("category", label);
                }}
              />
            )}

            {previewOpen && (
              <AdverPreviewModal
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                values={values}
                images={images}
                onPublish={() => {
                  setPreviewOpen(false);
                  submitRef.current?.click();
                }}
              />
            )}
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdverDesktop;
