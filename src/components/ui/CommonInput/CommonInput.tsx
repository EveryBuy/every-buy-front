import { FC, ReactNode, ChangeEvent } from "react";
import styles from "./CommonInput.module.scss";

type CommonInputProps = {
  text: string;
  typeTitle: string;
  typeInput: boolean | string;
  value: string;
  id?: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder: string;
  required?: boolean;
  children?: ReactNode;
  errorsMessage?: ReactNode;
};

const CommonInput: FC<CommonInputProps> = ({
  text,
  typeTitle,
  typeInput,
  value,
  setValue,
  placeholder,
  required,
  children,
  errorsMessage,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputTitle} htmlFor={typeTitle}>
        {text}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={typeInput ? "text" : "password"}
          id="password"
          value={value}
          onChange={setValue}
          className={styles.input}
          required={required}
          placeholder={placeholder}
        />
        {children}
      </div>
      {errorsMessage}
    </div>
  );
};

export default CommonInput;
