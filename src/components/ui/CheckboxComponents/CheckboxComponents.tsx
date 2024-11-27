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
      <label key={name} className={labelClassName}>
        <Field
          type="checkbox"
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

// ======================================================

// interface CheckboxOption {
//   name: string;
//   label: string;
//   value?: string;
//   inputClassName?: string; // класс для Field
//   labelClassName?: string; // класс для label
// }

// interface CheckboxGroupProps {
//   options: CheckboxOption[];
//   groupName: string;
//   groupClassName?: string;
// }

// const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
//   options,
//   groupName,
//   groupClassName,
// }) => (
//   <div role="group" aria-labelledby={groupName} className={groupClassName}>
//     {options.map(({ name, label, value, inputClassName, labelClassName }) => (
//       <label key={name} className={labelClassName}>
//         <Field
//           type="checkbox"
//           name={name}
//           value={value}
//           className={inputClassName} // класс применяется только к Field
//         />
//         {label}
//       </label>
//     ))}
//   </div>
// );
