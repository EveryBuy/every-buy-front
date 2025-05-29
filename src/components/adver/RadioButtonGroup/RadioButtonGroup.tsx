"use client";
import Image from "next/image";
import { Field } from "formik";


interface RadioButtonGroupProps {
  name: string;
  options: { value: string; label: string }[];
  title: string;
  wrapperClass?: string; 
  groupClass?: string; 
  labelClass?: string; 
  inputClass?: string; 
  radioBoxClass?: string; 
  radioUncheckedClass?: string;
  radioCheckedClass?: string;
  uncheckedIcon: string; 
  checkedIcon: string; 
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  options,
  title,
  wrapperClass = "",
  groupClass = "",
  labelClass = "",
  inputClass = "",
  radioBoxClass = "",
  radioUncheckedClass = "",
  radioCheckedClass = "",
  uncheckedIcon,
  checkedIcon,
}) => {
  return (
    <div className={wrapperClass}>
      <div role="group" aria-labelledby="radio-group" className={groupClass}>
        <h2>
          {title}
          <span style={{ color: "red", marginLeft: "4px" }}>*</span>
        </h2>
        {options.map((option) => (
          <label key={option.value} className={labelClass}>
            <Field
              type="radio"
              name={name}
              value={option.value}
              className={inputClass}
            />
            <span className={radioBoxClass}>
              <Image
                priority
                src={uncheckedIcon}
                alt="radio icon"
                width={32}
                height={32}
                className={radioUncheckedClass}
              />
              <Image
                priority
                src={checkedIcon}
                alt="checked icon"
                width={32}
                height={32}
                className={radioCheckedClass}
              />
            </span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
