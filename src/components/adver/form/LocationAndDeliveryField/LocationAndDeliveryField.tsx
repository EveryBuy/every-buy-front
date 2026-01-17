"use client";

import { useFormikContext } from "formik";
import { FormValues } from "@/types/adverFormType";
import {ErrorMessage} from "@/components";
import styles from "./LocationAndDeliveryField.module.scss";
import CityAutocomplete from "../LocationBlock/CityAutocomplete/CityAutocomplete";
import CheckboxGroup from "../../CheckboxGroup/CheckboxGroup";

const LocationAndDeliveryField = () => {
  const { touched, errors } = useFormikContext<FormValues>();

  return (
    <div className={styles.locationColumn}>
      <label className={styles.linkItemText}>
        Місцезнаходження
        <span className={styles.required}>*</span>
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
  );
};

export default LocationAndDeliveryField;
