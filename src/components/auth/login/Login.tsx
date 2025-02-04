"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import FilledIconSrc from "@/assets/Svg/CircleFilled.svg";
import ErrorIconSrc from "@/assets/Svg/CircleError.svg";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import styles from "./Login.module.scss";
import Image from "next/image";
import { login } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ErrorModal } from "@/components";
import {
  // validatePhone,
  // validateEmail,
  validateInput,
  validatePassword,
} from "@/utils/validate";
import clsx from "clsx";

type ErrorsType = {
  emailOrPhone: string;
  password: string;
  [key: string]: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    emailOrPhone: "",
    password: "",
  });
  const [loginServerErrorModal, setLoginServerErrorModal] = useState(false);
  const [loginUserErrorModal, setLoginUserErrorModal] = useState(false);
  const [unknownErrorModalOpen, setUnknownErrorModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    isLoggedIn && router.push("/user");
  }, [isLoggedIn, router]);

  // for testing
  // login: "mitskp11@gmail.com",
  // password: "14fgGH7_er$$",

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      emailOrPhone: "",
      password: "",
    };
    if (!validateInput(emailOrPhone)) {
      newErrors.emailOrPhone = "невірний формат телефону чи e-mail";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Невірний формат пароля";
      // "Пароль повинен включати: Великі літери: A-Z. Маленькі літери: a-z. Цифри: 0-9. Символи: ~! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/ ";
    }
    setErrors(newErrors);
    if (newErrors.emailOrPhone || newErrors.password) {
      return;
    }
    try {
      await dispatch(
        login({
          login: emailOrPhone,
          password: password,
        })
      ).unwrap();
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setLoginServerErrorModal(true);
            break;
          case 401:
            setLoginUserErrorModal(true);
            break;
          default:
            setUnknownErrorModalOpen(true);
        }
      } else {
        setUnknownErrorModalOpen(true);
      }
    }
  };

  const getInputClass = (field: string) => {
    if (errors[field]) {
      return "invalid";
    } else if (field === "emailOrPhone" && validateInput(emailOrPhone)) {
      return "valid";
    } else if (field === "password" && validatePassword(password)) {
      return "valid";
    }
    return "";
  };

  const changeEyeShowPasswordStatus = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <CommonInput
          typeTitle="emailOrPhone"
          text="Телефон або e-mail"
          typeInput="text"
          value={emailOrPhone}
          setValue={(e) => setEmailOrPhone(e.target.value)}
          required={true}
          className={getInputClass("emailOrPhone")}
          placeholder="введіть телефон або e-mail"
          errorsMessage={
            errors.emailOrPhone && (
              <span className={styles.errorMessage}>{errors.emailOrPhone}</span>
            )
          }
        >
          {errors.emailOrPhone ? (
            <Image
              className={styles.errorImage}
              alt=""
              width={24}
              height={24}
              src={ErrorIconSrc}
            />
          ) : (
            validateInput(emailOrPhone) && (
              <Image
                className={styles.errorImage}
                alt=""
                width={24}
                height={24}
                src={FilledIconSrc}
              />
            )
          )}
        </CommonInput>

        <CommonInput
          typeTitle="password"
          text="Введіть пароль"
          typeInput={showPassword}
          value={password}
          required={true}
          setValue={(e) => setPassword(e.target.value)}
          placeholder="введіть пароль"
          errorsMessage={
            errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )
          }
        >
          <button
            type="button"
            onClick={changeEyeShowPasswordStatus}
            className={styles.button}
          >
            <Image
              src={showPassword ? EyePassword : EyeInvisibleFilled}
              alt=""
              width={24}
              height={24}
            />
          </button>
        </CommonInput>

        <button
          className={clsx(
            styles.submitButton,
            emailOrPhone && password && styles.activeColor
          )}
          type="submit"
        >
          Увійти
        </button>
      </form>

      {loginServerErrorModal && (
        <ErrorModal
          onClose={() => {
            setLoginServerErrorModal(false);
            router.refresh();
          }}
          title={"Упс! Проблеми на сервері!"}
          buttonText={"Перезавантажити сторінку"}
        />
      )}
      {loginUserErrorModal && (
        <ErrorModal
          onClose={() => {
            setLoginUserErrorModal(false);
            router.refresh();
          }}
          title={
            "Користувача з таким телефоном/імейлом та паролем не знайдено!"
          }
          buttonText={"Повернутися"}
        />
      )}
      {unknownErrorModalOpen && (
        <ErrorModal
          onClose={() => router.push("/")}
          title={"Упс! Невідома помилка!"}
          buttonText={"На головну"}
        />
      )}
    </>
  );
};

export default Login;
