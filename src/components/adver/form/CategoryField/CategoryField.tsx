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
  const { touched, errors, submitCount, values } =
    useFormikContext<FormValues>();
const isInvalid = !!(errors.categoryId && (touched.categoryId || submitCount > 0));
  console.log('FIELD STATE:', { 
  value: values.categoryId, 
  error: errors.categoryId, 
  touched: touched.categoryId 
});
  return (
    <div className={styles.fieldWrapper}>
      <label>
        Категорія<span className={styles.required}>*</span>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="categoryId"
            value={values.categoryLabel || ""}
            readOnly
            placeholder="Оберіть категорію товару"
            className={`${styles.styledField} ${isInvalid ? styles.errorBorder : ""}`}
            onClick={onOpenModal}
          />

          <button
            type="button"
            className={styles.buttonInput}
            // onClick={onOpenModal}
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
        touched={touched.categoryId || submitCount > 0}
        error={errors.categoryId}
        successMessage="Категорія успішно додана"
      />
    </div>
  );
};

export default CategoryField;
