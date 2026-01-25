"use client";

import { useFormikContext } from "formik";
import { FormValues } from "@/types/adverFormType";
import { RadioButtonGroup } from "@/components";
import { ErrorMessage } from "@/components";

import radioboxIcon from "@/assets/Svg/checkboxIcon.svg";
import checkIcon from "@/assets/Svg/checkIcon.svg";

import styles from "./ProductConditionField.module.scss";

const ProductConditionField = () => {
  const { touched, errors, setFieldValue } = useFormikContext<FormValues>();

  return (
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
        inputClass={`${styles.visuallyHidden} ${styles.radioboxInput} ${
          touched.productType && errors.productType ? styles.errorBorder : ""
        } ${
          touched.productType && !errors.productType ? styles.successBorder : ""
        }`}
        radioBoxClass={styles.radioBox}
        radioUncheckedClass={styles.radioUnchecked}
        radioCheckedClass={styles.radioChecked}
        uncheckedIcon={radioboxIcon}
        checkedIcon={checkIcon}
        onChange={(value) => setFieldValue("productType", value)}
      />

      <ErrorMessage
        touched={touched.productType}
        error={errors.productType}
        successMessage="Стан товару успішно додано"
      />
    </div>
  );
};

export default ProductConditionField;
