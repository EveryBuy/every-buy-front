"use client";

import { Field, useFormikContext } from "formik";
import { FormValues } from "@/types/adverFormType";
import { ErrorMessage } from "@/components";
import styles from "./DescriptionField.module.scss";

const DescriptionField = () => {
  const { touched, errors, values, setFieldValue } =
    useFormikContext<FormValues>();

  const length = (values.description || "").length;

  return (
    <div className={styles.wrapper}>
      <label>
        Опис товару<span className={styles.required}>*</span>
        <Field
          as="textarea"
          name="description"
          rows={4}
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFieldValue("description", e.target.value);
          }}
        />
        <div className={styles.textareaText}>
          <p className={styles.helperText}>Вкажіть щонайменше 30 символів</p>
          <p className={styles.helperText}>{length}/3000</p>
        </div>
      </label>

      <ErrorMessage
        touched={touched.description}
        error={errors.description}
        successMessage="Опис товару успішно додано"
      />
    </div>
  );
};

export default DescriptionField;
