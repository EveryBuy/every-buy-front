"use client";
import Image from "next/image";
import { useField, useFormikContext } from "formik";

interface CheckboxGroupProps {
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
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
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
}) => {
const { values, setFieldValue } = useFormikContext<any>();

const selectedValues: string[] = Array.isArray(values[name])
    ? values[name]
    : [];

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      setFieldValue(
        name,
        selectedValues.filter((v) => v !== value)
      );
    } else {
      setFieldValue(name, [...selectedValues, value]);
    }
  };

  return (
    <div role="group" aria-label={title || name} className={groupClass}>
      {title && (
        <h2>
          {title}
          <span style={{ color: "red", marginLeft: "4px" }}>*</span>
        </h2>
      )}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
            console.log()
          return (
            <label key={option.value} className={labelClass}>
              <input
                type="checkbox"
                name={`${name}`}
                value={option.value}
                checked={isChecked}
                className={inputClass}
                onChange={() => handleToggle(option.value)}
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

export default CheckboxGroup;
