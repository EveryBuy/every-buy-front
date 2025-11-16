"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";

import { CommonButton, RadioButtonGroup } from "@/components";
import { AdverPhotoList } from "@/components";
import { ErrorMessage } from "@/components";
import Select from "@/assets/Svg/reshot-icon-chevron-arrow-down-circle.svg";
import Close from "@/assets/Svg/xClose.svg";
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
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import { FilledInput } from "@mui/material";
import { useRouter } from "next/navigation";
import { AdverPhoto } from "../AdverPhotoList/AdverPhotoList";
import SuccessCreateModal from "../modals/Success/SuccessCreateModal";
import { FormValues } from "@/types/adverFormType";

const initialValues: FormValues = {
  topSubCategoryId: null,
  lowSubCategoryId: null,
  categoryId: null,
  section: "SELL",
  cityId: null,
  categoryLabel: "",
  title: "",
  description: "",
  productType: "",
  price: "",
  priceType: "WITH_PRICE",
  isNegotiable: false,
  deliveryMethods: [],
  location: "",
};

const AuthSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, "Мінімум 2 символи.")
    .max(70, "Максимум 70 символів.")
    .required("Вкажіть назву товару."),

  description: Yup.string()
    .trim()
    .min(30, "Мінімум 30 символів.")
    .max(3000, "Максимум 3000 символів.")
    .required("Будь ласка, додайте опис товару."),

  categoryId: Yup.number()
    .typeError("Будь ласка, зазначте категорію товару.")
    .required("Будь ласка, зазначте категорію товару."),

  location: Yup.string().required("Будь ласка, вкажіть місцезнаходження."),

  productType: Yup.mixed()
    .oneOf(["NEW", "USED", "OTHER"], "Будь ласка, оберіть стан товару.")
    .required(),

  section: Yup.mixed().oneOf(["SELL", "BUY"]).required(),

  deliveryMethods: Yup.array()
    .min(1, "Оберіть спосіб доставки.")
    .required("Будь ласка, оберіть хоча б один спосіб доставки."),

  price: Yup.string().when("isNegotiable", {
    is: false,
    then: (schema) =>
      schema.required("Вкажіть ціну.").matches(/^\d+$/, "Тільки цифри."),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const AdverDesktop = () => {
  const [images, setImages] = useState<AdverPhoto[]>([]);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = (values: FormValues) => {
    console.log("Preview values:", values);
    setPreviewOpen(true);
  };

  const router = useRouter();

  async function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    console.log("=== SUBMIT STARTED ===");
    console.log("FORM VALUES:", values);
    console.log("TOKEN:", token);
    console.log("IMAGES:", images);

    try {
      if (!token) return;
      console.log("token", token);
      const requestPayload = {
        topSubCategoryId: values.topSubCategoryId,
        lowSubCategoryId: values.lowSubCategoryId,
        section: values.section,
        cityId: values.cityId,
        productType: values.productType,
        price: values.price ? Number(values.price) : null,
        title: values.title,
        isNegotiable: values.isNegotiable,
        categoryId: values.categoryId,
        description: values.description,
        deliveryMethods: values.deliveryMethods,
        rotations: images.map((img) => img.rotation ?? 0),
      };
      const formData = new FormData();

      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
      );

      images.forEach(({ file }) => {
        formData.append("photos", file);
      });

      await dispatch(createAdvertisement(formData)).unwrap();

      actions.resetForm();
      setImages([]);

      setSuccessOpen(true);
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
        <div>
          <h1>Створити оголошення</h1>
        </div>
        <div>
          <button onClick={() => router.push("/")}>
            <Image src={Close} alt="close page" width={32} height={32} />
          </button>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={handleSubmit}
      >
        {({ handleBlur, touched, errors, setFieldValue, values }) => (
          <>
            {/* <FormSyncers /> */}
            <Form autoComplete="off" className={styles.styledForm}>
              {/* buy / sell */}
              <div className={`${styles.linkItem} ${styles.sellBox}`}>
                <label className={`${styles.linkItemText}`}>
                  <Field
                    type="radio"
                    name="section"
                    value="BUY"
                    className={styles.radio}
                  />
                  <span style={{ fontSize: "20px" }}>Куплю</span>
                </label>

                <label className={styles.linkItemText}>
                  <Field
                    type="radio"
                    name="section"
                    value="SELL"
                    className={styles.radio}
                  />
                  <span style={{ fontSize: "20px" }}>Продам</span>
                </label>
              </div>
              <div className={styles.wrapperInput}>
                <section className={styles.formWrapper}>
                  {/* фото */}
                  <AdverPhotoList images={images} setImages={setImages} />
                </section>

                {/* назва товару */}
                <section className={styles.formWrapper}>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div>
                      {/* Назва товару */}
                      <div style={{ marginBottom: "40px" }}>
                        <label>
                          Назва товару
                          <span style={{ color: "#C21919" }}>*</span>
                          <Field
                            type="text"
                            name="title"
                            placeholder="Наприклад, жіноча сукня 32 розміру грн."
                            className={`
                              ${styles.styledField}
                              ${
                                touched.title && errors.title
                                  ? styles.errorBorder
                                  : ""
                              }
                              ${
                                touched.title && !errors.title
                                  ? styles.successBorder
                                  : ""
                              }
                            `}
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
                              setFieldValue("title", v);
                              setDescriptionLength(
                                v.length > 70 ? 70 : v.length
                              );
                            }}
                          />
                          <div className={styles.textareaText}>
                            <p className={styles.helperText}>
                              Введіть від 16 до 70 символів
                            </p>
                            <p className={styles.helperText}>
                              {Math.min(descriptionLength, 70)}/70
                            </p>
                          </div>
                        </label>
                        <ErrorMessage
                          touched={touched.title}
                          error={errors.title}
                          successMessage="Успішно введено назву товару"
                        />
                      </div>
                      {/* Категорія */}
                      <div className={styles.fieldWrapper}>
                        <label>
                          Категорія<span style={{ color: "#C21919" }}>*</span>
                          <Field
                            type="text"
                            name="categoryId"
                            value={values.categoryLabel}
                            readOnly
                            placeholder="Оберіть категорію товару "
                            className={`
                              ${styles.styledField}
                              ${
                                touched.categoryId && errors.categoryId
                                  ? styles.errorBorder
                                  : ""
                              }
                              ${
                                touched.categoryId && !errors.categoryId
                                  ? styles.successBorder
                                  : ""
                              }
                            `}
                            onBlur={handleBlur}
                          />
                          <button
                            type="button"
                            className={styles.buttonInput}
                            onClick={() => setCategoryModalOpen(true)}
                          >
                            <Image
                              priority
                              src={Select}
                              alt="icon select"
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
                        Опис товару<span style={{ color: "#C21919" }}>*</span>
                        <Field
                          as="textarea"
                          name="description"
                          rows="4"
                          cols="50"
                          className={`
                            ${styles.styledField} 
                            ${styles.styledTexterea}
                            ${
                              touched.description && errors.description
                                ? styles.errorBorder
                                : ""
                            }
                            ${
                              touched.description && !errors.description
                                ? styles.successBorder
                                : ""
                            }
                          `}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setFieldValue("description", e.target.value);
                          }}
                        />
                        <div className={styles.textareaText}>
                          <p className={styles.helperText}>
                            Вкажіть щонайменше 30 символів
                          </p>
                          <p className={styles.helperText}>
                            {(values.description || "").length}/3000
                          </p>
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
                  <div className={styles.priceLocationWrapper}>
                    {/* Ліва колонка */}
                    <div className={styles.priceColumn}>
                      {/* "Ціна" */}
                      <div className={styles.linkItem}>
                        <label className={styles.linkItemText}>
                          <Field
                            type="radio"
                            name="priceType"
                            value="price"
                            className={styles.radio}
                          />
                          <span>Ціна</span>
                        </label>

                        <label className={styles.linkItemText}>
                          <Field
                            type="radio"
                            name="priceType"
                            value="free"
                            className={styles.radio}
                          />
                          <span>Безкоштовно</span>
                        </label>

                        <div className={styles.toggleWrapper}>
                          <label className={styles.linkItemText}>
                            <span className={styles.linkItemText}>
                              Договірна
                            </span>

                            <div>
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
                            </div>
                          </label>
                        </div>
                      </div>
                      <label>
                        <Field
                          type="text"
                          name="price"
                          placeholder="Вартість за 1 шт. в грн."
                          className={`
                              ${styles.styledField}
                              ${
                                touched.price && errors.price
                                  ? styles.errorBorder
                                  : ""
                              }
                              ${
                                touched.price && !errors.price
                                  ? styles.successBorder
                                  : ""
                              }
                            `}
                          onBlur={handleBlur}
                        />
                        <div className={styles.textareaText}>
                          <p className={styles.helperText}>
                            Використовуйте лише цифри
                          </p>
                          <p>грн.</p>
                        </div>
                      </label>
                      <ErrorMessage
                        touched={touched.price}
                        error={errors.price}
                        successMessage="Ціна успішно додана"
                      />

                      {/* Стан товару */}
                      <div className={styles.conditionWrapper}>
                        <RadioButtonGroup
                          name="productType"
                          title="Стан товару"
                          options={[
                            { value: "NEW", label: "Нове" },
                            { value: "USED", label: "Вживане" },
                            { value: "OTHER", label: "Інше" },
                          ]}
                          groupClass={styles.radioboxGroup}
                          labelClass={`${styles.radioboxLabel} ${styles.check}`}
                          inputClass={`${styles.visuallyHidden} ${
                            styles.radioboxInput
                          } ${
                            touched.productType && errors.productType
                              ? styles.errorBorder
                              : ""
                          }
                              ${
                                touched.productType && !errors.productType
                                  ? styles.successBorder
                                  : ""
                              }`}
                          radioBoxClass={styles.radioBox}
                          radioUncheckedClass={styles.radioUnchecked}
                          radioCheckedClass={styles.radioChecked}
                          uncheckedIcon={radioboxIcon}
                          checkedIcon={checkIcon}
                          onChange={(value) =>
                            setFieldValue("productType", value)
                          }
                        />
                        <ErrorMessage
                          touched={touched.productType}
                          error={errors.productType}
                          successMessage="Стан товару успішно додано"
                        />
                      </div>
                    </div>

                    {/* Права колонка */}
                    <div className={styles.locationColumn}>
                      {/* Місцезнаходження */}
                      <label className={styles.linkItemText}>
                        Місцезнаходження
                        <span style={{ color: "#C21919" }}>*</span>
                      </label>
                      <CityAutocomplete
                        styledFieldClass={`
                              ${styles.styledField}
                              ${
                                touched.location && errors.location
                                  ? styles.errorBorder
                                  : ""
                              }
                              ${
                                touched.location && !errors.location
                                  ? styles.successBorder
                                  : ""
                              }
                            `}
                        nameField="location"
                        idField="cityId"
                        placeholder="введіть місто (мін. 3 символи)"
                        minLength={3}
                      />

                      <ErrorMessage
                        touched={touched.location}
                        error={errors.location}
                        successMessage="Місто успішно додано"
                      />

                      {/* Спосіб доставки */}
                      <div className={styles.deliveryWrapper}>
                        <CheckboxGroup
                          name="deliveryMethods"
                          title="Спосіб доставки"
                          options={[
                            { value: "NOVA_POST", label: "Нова пошта" },
                            { value: "UKR_POST", label: "Укрпошта" },
                            { value: "Meest_Express", label: "Meest Express" },
                            { value: "Other", label: "Інше" },
                          ]}
                          groupClass={styles.checkboxGroup}
                          labelClass={styles.checkboxLabel}
                          inputClass={styles.checkboxInput}
                          radioBoxClass={styles.checkboxBox}
                        />
                        <ErrorMessage
                          touched={touched.deliveryMethods}
                          error={errors.deliveryMethods}
                          successMessage="Спосіб доставки успішно додано"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* попередній перегляд */}
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
              <button
                type="submit"
                ref={submitRef}
                style={{ display: "none" }}
              ></button>
            </Form>
            {categoryModalOpen && (
              <CategoryTreeModal
                open={categoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onSelect={({
                  categoryId,
                  topSubCategoryId,
                  lowSubCategoryId,
                  categoryLabel,
                }) => {
                  setFieldValue("categoryId", categoryId);
                  setFieldValue("topSubCategoryId", topSubCategoryId);
                  setFieldValue("lowSubCategoryId", lowSubCategoryId);
                  setFieldValue("categoryLabel", categoryLabel);
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
            {/* успіх при створенні */}
            {successOpen && <SuccessCreateModal />}
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdverDesktop;
