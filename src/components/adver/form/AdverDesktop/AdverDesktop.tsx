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

import { CategoryTreeModal } from "../../categories/AdverSubCategoriesDesktop/CategoryTreeModal";
import ToggleSwitch from "../../ToggleSwitch/ToogleSwitch";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createAdvertisement } from "@/redux/advertisement/operations";
import { selectToken } from "@/redux/auth/selectorsAuth";
import CityAutocomplete from "../LocationBlock/CityAutocomplete/CityAutocomplete";
import AdverPreviewModal from "../../preview/AdverPreviewModal/AdverPreviewModal";
import CheckboxGroup from "../../CheckboxGroup/CheckboxGroup";
import { FilledInput } from "@mui/material";
import { useRouter } from "next/navigation";
import { AdverPhoto } from "../../photos/AdverPhotoList/AdverPhotoList";
import SuccessCreateModal from "../../modals/Success/SuccessCreateModal";
import { FormValues } from "@/types/adverFormType";
import Spinner from "@/components/ui/CommonSpiner/Spinner";
import PriceBlockDesktop from "../PriceBlock/PriceBlockDesktop";
import SectionSwitch from "../SectionSwitch/SectionSwitch";
import TitleField from "../TitleField/TitleField";
import CategoryField from "../CategoryField/CategoryField";
import DescriptionField from "../DescriptionField/DescriptionField";
import ProductConditionField from "../ProductConditionField/ProductConditionField";
import LocationAndDeliveryField from "../LocationAndDeliveryField/LocationAndDeliveryField";
import { toast, Zoom, ToastPosition, ToastOptions } from "react-toastify";

const toastMessage: ToastOptions = {
  position: "top-center" as ToastPosition,
  autoClose: 1500,
  theme: "colored",
  transition: Zoom,
};

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
    .required("Вкажіть назву товару.")
    .test(
      "min-2",
      "Занадто коротка назва. Мінімум 2 символи.",
      (value) => (value || "").length >= 2
    )
    .max(70, "Максимум 70 символів."),

  description: Yup.string()
    .trim()
    .required("Будь ласка, додайте опис товару.")
    .test(
      "min-30",
      "Опис занадто короткий — мінімум 30 символів.",
      (value) => (value || "").length >= 30
    )
    .max(3000, "Максимум 3000 символів."),

  categoryId: Yup.number()
    .typeError("Будь ласка, зазначте категорію товару.")
    .required("Будь ласка, зазначте категорію товару."),

  location: Yup.string().required("Будь ласка, вкажіть місцезнаходження."),

  productType: Yup.mixed()
    .oneOf(["NEW", "USED", "OTHER"], "Будь ласка, оберіть стан товару.")
    .required("Будь ласка, оберіть стан товару."),

  section: Yup.mixed().oneOf(["SELL", "BUY"]).required(),

  deliveryMethods: Yup.array()
    .min(1, "Оберіть спосіб доставки.")
    .required("Будь ласка, оберіть хоча б один спосіб доставки."),

  price: Yup.string().when("priceType", {
    is: "price",
    then: (schema) =>
      schema
        .required("Вкажіть ціну.")
        .matches(/^\d+$/, "Можна вводити тільки цифри.")
        .test(
          "not-zero",
          "Ціна не може дорівнювати 0.",
          (value) => value !== "0"
        ),
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
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = (values: FormValues) => {
    console.log("Preview values:", values);
    if (isLoading) return;
    setPreviewOpen(true);
  };

  const router = useRouter();

  async function handleSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) {
    setIsLoading(true);

    try {
      // if (!token) return;
      // console.log("token", token);
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
      setIsLoading(false);
    }
  }

  const submitRef = useRef<HTMLButtonElement>(null);
  console.log("isLoading", isLoading);
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
        {({
          handleBlur,
          touched,
          errors,
          setFieldValue,
          setTouched,
          values,
          validateForm,
        }) => (
          <>
            <Form autoComplete="off" className={styles.styledForm}>
              {/* buy / sell */}
              <SectionSwitch />
              {/* фото */}
              <div className={styles.wrapperInput}>
                <section className={styles.formWrapper}>
                  <AdverPhotoList images={images} setImages={setImages} />
                </section>
                {/* Назва товару, категорія та опис */}
                <section className={styles.formWrapper}>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div>
                      <TitleField
                        descriptionLength={descriptionLength}
                        setDescriptionLength={setDescriptionLength}
                      />
                      <CategoryField
                        onOpenModal={() => setCategoryModalOpen(true)}
                      />
                    </div>
                    <DescriptionField />
                  </div>
                </section>

                <section className={styles.formWrapper}>
                  <div className={styles.priceLocationWrapper}>
                    {/* Ціна та стан товару */}
                    <div className={styles.priceColumn}>
                      <PriceBlockDesktop />
                      <ProductConditionField />
                    </div>
                    {/* Місцезнаходження та доставка*/}
                    <LocationAndDeliveryField />
                  </div>
                </section>
              </div>

              <div className={styles.buttonWrapper}>
                <CommonButton
                  type="button"
                  title="Попередній перегляд"
                  disabled={isLoading}
                  className={styles.adverButton}
                  onClick={async () => {
                    const validationErrors = await validateForm();

                    if (Object.keys(validationErrors).length > 0) {

                      toast.error("Заповніть обовʼязкові поля", toastMessage);

                      setTouched(
                        Object.keys(validationErrors).reduce((acc, key) => {
                          acc[key] = true;
                          return acc;
                        }, {} as Record<string, boolean>)
                      );

                      return false;
                    }

                    setPreviewOpen(true);
                  }}
                />

                <CommonButton
                  type="submit"
                  title={isLoading ? "Публікуємо" : "Опублікувати"}
                  disabled={isLoading}
                  className={`${styles.adverButton} ${styles.adverButtonAd}`}
                >
                  {isLoading && <Spinner />}
                </CommonButton>
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

            {successOpen && <SuccessCreateModal />}
          </>
        )}
      </Formik>
    </div>
  );
};

export default AdverDesktop;
