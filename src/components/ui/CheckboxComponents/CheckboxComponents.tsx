import { Field } from "formik";

interface CheckboxOption {
  name: string;
  label: string;
  value?: string;
  inputClassName?: string;
  labelClassName?: string;
}

interface CheckboxProps {
  options: CheckboxOption[];
  checkboxName: string;
  checkboxClassName?: string;
}

const CheckboxComponents: React.FC<CheckboxProps> = ({
  options,
  checkboxName,
  checkboxClassName,
}) => (
  <div
    role="group"
    aria-labelledby={checkboxName}
    className={checkboxClassName}
  >
    {options.map(({ name, label, value, inputClassName, labelClassName }) => (
      <label key={value} className={labelClassName}>
        <Field
          type="radio"
          name={name}
          value={value}
          className={inputClassName}
        />
        {label}
      </label>
    ))}
  </div>
);

export default CheckboxComponents;
