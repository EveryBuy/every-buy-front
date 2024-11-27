import { FC } from "react";
import Image from "next/image";
import styles from "./ErrorMessage.module.scss";
import IconError from "@/assets/Svg/icon-checkbox-error.svg";
import IconSucces from "@/assets/Svg/icon-checkbox-success.svg";

interface ErrorMessageProps {
  touched?: boolean | Record<string, boolean>;
  error?: string | Record<string, any>;
  successMessage?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  touched,
  error,
  successMessage = "Success",
}) => {
  const isTouched =
    typeof touched === "boolean"
      ? touched
      : touched
      ? Object.values(touched).some(Boolean)
      : false;

  const errorMessage =
    typeof error === "string"
      ? error
      : typeof error === "object" && error
      ? Object.values(error).join(", ")
      : undefined;

  if (isTouched && errorMessage) {
    return (
      <div className={styles.messageError}>
        <Image src={IconError} alt="Error Icon" width={16} height={16} />
        {errorMessage}
      </div>
    );
  }

  if (isTouched && !errorMessage) {
    return (
      <div className={styles.messageSuccess}>
        <Image src={IconSucces} alt="Success Icon" width={16} height={16} />
        {successMessage}
      </div>
    );
  }

  return null;
};

export default ErrorMessage;
