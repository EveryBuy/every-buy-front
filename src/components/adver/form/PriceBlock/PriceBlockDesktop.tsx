import { Field, useFormikContext } from "formik";
import { FormValues } from "@/types/adverFormType";
import styles from "./PriceBlockDesktop.module.scss";
import ToggleSwitch from "../../ToggleSwitch/ToogleSwitch";
import { ErrorMessage } from "@/components";

const PriceBlockDesktop = () => {
  const { values, setFieldValue, touched, errors } =
    useFormikContext<FormValues>();

  const isFree = values.priceType === "FREE";

  return (
    <>
      <div className={styles.priceColumn}>
        <div className={styles.linkItem}>
          <label className={styles.linkItemText}>
            <Field
              type="radio"
              name="priceType"
              value="price"
              className={styles.radio}
              onChange={() => {
                setFieldValue("priceType", "price");
              }}
            />
            <span>Ціна</span>
          </label>

          <label className={styles.linkItemText}>
            <Field
              type="radio"
              name="priceType"
              value="FREE"
              className={styles.radio}
              onChange={() => {
                setFieldValue("priceType", "FREE");
                setFieldValue("price", "");
                setFieldValue("isNegotiable", false);
              }}
            />
            <span>Безкоштовно</span>
          </label>
          <div className={styles.toggleWrapper}>
            <label className={styles.linkItemText}>
              <span className={styles.linkItemText}>Договірна</span>
              <div>
                <ToggleSwitch
                  name="isNegotiable"
                  checked={values.isNegotiable}
                  disabled={values.priceType === "FREE"}
                  onChange={(checked) => setFieldValue("isNegotiable", checked)}
                />
              </div>
            </label>
          </div>
        </div>
<div>
        <Field
          type="text"
          name="price"
          placeholder="Вартість за 1 шт. в грн."
          disabled={isFree}
          className={`
          ${styles.styledField}
          ${!isFree && touched.price && errors.price ? styles.errorBorder : ""}
        `}
        />

        <div className={styles.textareaText}>
          <p className={styles.helperText}>Використовуйте лише цифри</p>
        </div>
      </div>
        <ErrorMessage
          touched={touched.price}
          error={errors.price}
          successMessage="Ціна успішно додана"
        />
</div>
    </>
  );
};

export default PriceBlockDesktop;
