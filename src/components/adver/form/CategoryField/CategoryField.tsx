"use client";

import { Field, useFormikContext } from "formik";
import Image from "next/image";
import { FormValues } from "@/types/adverFormType";
import { ErrorMessage } from "@/components";
import Select from "@/assets/Svg/reshot-icon-chevron-arrow-down-circle.svg";
import styles from "./CategoryField.module.scss";

type Props = {
  onOpenModal: () => void;
};

const CategoryField: React.FC<Props> = ({ onOpenModal }) => {
  const { touched, errors, handleBlur, values } =
    useFormikContext<FormValues>();

  return (
    <div className={styles.fieldWrapper}>
      <label>
        Категорія<span className={styles.required}>*</span>
        <div className={styles.inputWrapper}>
          <Field
            type="text"
            name="categoryId"
            value={values.categoryLabel}
            readOnly
            placeholder="Оберіть категорію товару"
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
            onClick={onOpenModal}
          >
            <Image
              priority
              src={Select}
              alt="icon select"
              width={24}
              height={24}
            />
          </button>
        </div>
      </label>

      <ErrorMessage
        touched={touched.categoryId}
        error={errors.categoryId}
        successMessage="Категорія успішно додана"
      />
    </div>
  );
};

export default CategoryField;
