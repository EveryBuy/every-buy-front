"use client";
import Image from "next/image";
import { Field, useField } from "formik";
// import styles from "./RadioButtonGroup.module.scss";

interface RadioButtonGroupProps {
  name: string;
  options: { value: string; label: string }[];
  title?: string;
  wrapperClass?: string;
  groupClass?: string;
  labelClass?: string;
  inputClass?: string;
  radioBoxClass?: string;
  radioUncheckedClass?: string;
  radioCheckedClass?: string;
  uncheckedIcon?: string;
  checkedIcon?: string;
  onChange?: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  options,
  title,
  groupClass = "",
  labelClass = "",
  inputClass = "",
  radioBoxClass = "",
  radioUncheckedClass = "",
  radioCheckedClass = "",
  uncheckedIcon,
  checkedIcon,
  onChange
}) => {
  const [field, , helpers] = useField(name);
  return (
    <div role="group" aria-labelledby="radio-group" className={groupClass}>
      <h2>
        {title}
        <span style={{ color: "red", marginLeft: "4px" }}>*</span>
      </h2>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {options.map((option) => {

          const isChecked = field.value === option.value;
          
          return (
            <label key={option.value} className={labelClass}>
              <input
                type="radio"
                // {...field}
                name={field.value}
                value={option.value}
                checked={isChecked}
                className={inputClass}
                onChange={() => helpers.setValue(option.value)}
              />
              <span className={radioBoxClass}>
                <Image
                  src={isChecked ? checkedIcon || "" : uncheckedIcon || ""}
                  className={
                    isChecked ? radioCheckedClass : radioUncheckedClass
                  }
                  width={24}
                  height={24}
                  alt=""
                />
              </span>
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
