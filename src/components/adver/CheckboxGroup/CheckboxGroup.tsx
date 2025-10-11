"use client";
import Image from "next/image";
import { useField } from "formik";

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
  const [field, meta, helpers] = useField(name);
  const selectedValues: string[] = Array.isArray(meta.value)
    ? meta.value
    : meta.value
    ? [meta.value]
    : [];

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      helpers.setValue(selectedValues.filter((v) => v !== value));
    } else {
      helpers.setValue([...selectedValues, value]);
    }
  };
  console.log('values', name);
  return (
    <div role="group" aria-labelledby="radio-group" className={groupClass}>
      {title && (
        <h2>
          {title}
          <span style={{ color: "red", marginLeft: "4px" }}>*</span>
        </h2>
      )}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);
          return (
            <label key={option.value} className={labelClass}>
              <input
                type="checkbox"
                name={`${name}-${option.value}`}
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
