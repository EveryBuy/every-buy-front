import { FC, ReactNode, ChangeEvent } from "react";
import { Input, InputTitle, InputContainer } from "./CommonInput.styled";

type CommonInputProps = {
  text: string;
  typeTitle: string;
  typeInput: boolean | string;
  value: string;
  id?: string;
  setValue?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  className,
  placeholder,
  required,
  children,
  errorsMessage,
}) => {
  return (
    <InputContainer>
      <InputTitle htmlFor={typeTitle}>{text}</InputTitle>
      <div style={{ position: "relative" }}>
        <Input
          type={typeInput ? "text" : "password"}
          id="password"
          value={value}
          onChange={setValue}
          className={className}
          required={required}
          placeholder={placeholder}
        />
        {children}
      </div>
      {errorsMessage}
    </InputContainer>
  );
};

export default CommonInput;
