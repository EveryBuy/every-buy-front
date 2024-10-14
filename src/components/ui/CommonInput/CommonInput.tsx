import { FC, ReactNode, ChangeEvent } from "react";
import styles from "./CommonInput.module.scss";

type CommonInputProps = {
  text?: string;
  typeTitle?: string;
  typeInput: boolean | string;
  value: string;
  // id?: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  setOnBlur?: () => void;
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
  setOnBlur,
  placeholder,
  required,
  children,
  errorsMessage,
}) => {
  return (
    <div className={styles.inputContainer}>
      {text && (
        <label
          className={required ? styles.inputTitle : ""}
          htmlFor={typeTitle}
        >
          {text}
        </label>
      )}

      {/* <div className={styles.inputWrapper}> */}
      <input
        type={typeInput ? "text" : "password"}
        // id="password"
        value={value}
        onChange={setValue}
        onBlur={setOnBlur}
        className={styles.input}
        required={required}
        placeholder={placeholder}
      />
      {children}
      {/* </div> */}
      <div className={styles.errorMessageWrapper}>
        {errorsMessage && errorsMessage}
      </div>
      {/* {errorsMessage && (
        <div className={styles.errorMessageWrapper}>{errorsMessage}</div>
      )} */}
    </div>
  );
};

export default CommonInput;
