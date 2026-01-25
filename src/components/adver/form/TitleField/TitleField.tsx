"use client";

import { Field, useFormikContext } from "formik";
import { FormValues } from "@/types/adverFormType";
import { ErrorMessage } from "@/components";
import styles from "./TitleField.module.scss";

type Props = {
  descriptionLength: number;
  setDescriptionLength: (value: number) => void;
};

const TitleField: React.FC<Props> = ({
  descriptionLength,
  setDescriptionLength,
}) => {
  const { touched, errors, values, handleBlur, setFieldValue } =
    useFormikContext<FormValues>();

  return (
    <div className={styles.wrapper}>
      <label>
        Назва товару
        <span className={styles.required}>*</span>

        <Field
          type="text"
          name="title"
          placeholder="Наприклад, жіноча сукня 32 розміру грн."
          className={`
            ${styles.styledField}
            ${
              touched.title && errors.title ? styles.errorBorder : ""
            }
            ${
              touched.title && !errors.title ? styles.successBorder : ""
            }
          `}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleBlur(e);
            const trimmed = (e.target.value || "").trim();
            if (trimmed && !values.title) {
              setFieldValue("title", trimmed);
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const v = e.target.value;
            setFieldValue("title", v);
            setDescriptionLength(v.length > 70 ? 70 : v.length);
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
  );
};

export default TitleField;
