"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import styles from "./Login.module.scss";
import Image from "next/image";
import { login } from "@/redux/auth/operations";
import { selectIsLoggedIn, selectRehydrated } from "@/redux/auth/selectorsAuth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import clsx from "clsx";
import { validateEmailOrPhone, validatePassword } from "@/utils/validate";
import Spinner from "@/components/ui/CommonSpiner/Spinner";

interface ErrorsType {
  emailOrPhone: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRehydrated = useAppSelector(selectRehydrated);
  const [errors, setErrors] = useState<ErrorsType>({
    emailOrPhone: "",
    password: "",
  });
  const showOverlayLoader = !isLoggedIn && isRehydrated;
  useEffect(() => {
    isLoggedIn && router.push("/user");
  }, [isLoggedIn, router]);

  // TODO:
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(emailOrPhone, password);

  //   dispatch(
  //     login({
  //       login: emailOrPhone.slice(-9),
  //       password: password,
  //     })
  //   );
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = emailOrPhone.trim();
    const isPhone = /^(\+380\d{9}|380\d{9}|80\d{9}|0\d{9}|\d{9})$/.test(
      trimmed
    );

    const loginValue = isPhone ? trimmed.replace(/\D/g, "").slice(-9) : trimmed;

    try {
      await dispatch(
        login({
          login: loginValue,
          password: password,
        })
      ).unwrap();
    } catch (err) {
      console.error(err);
    } 
  };

  const changeEyeShowPasswordStatus = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailOrPhoneBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailOrPhone: validateEmailOrPhone(emailOrPhone)
        ? ""
        : "Невірний формат email або телефон",
    }));
  };

  const handlePasswordBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(password)
        ? ""
        : "Пароль повинен містити мінімум 8 символів, одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ",
    }));
  };
  const isEmailOrPhoneValid = validateEmailOrPhone(emailOrPhone);
  const isPasswordValid = validatePassword(password);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <CommonInput
          typeTitle="emailOrPhone"
          text="Телефон або e-mail"
          typeInput={true}
          value={emailOrPhone}
          isValid={emailOrPhone.length > 0 && isEmailOrPhoneValid}
          setValue={(e) => setEmailOrPhone(e.target.value)}
          setOnBlur={handleEmailOrPhoneBlur}
          required={true}
          placeholder="введіть телефон або e-mail"
          errorsMessage={
            errors.emailOrPhone && (
              <span className={styles.errorMessage}>{errors.emailOrPhone}</span>
            )
          }
        ></CommonInput>

        <CommonInput
          className={styles.passwordInput}
          typeTitle="password"
          text="Введіть пароль"
          typeInput={showPassword}
          value={password}
          isValid={password.length > 0 && isPasswordValid}
          required={true}
          setValue={(e) => setPassword(e.target.value)}
          setOnBlur={handlePasswordBlur}
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
          {showOverlayLoader ?  "Увійти" : <Spinner />}
        </button>
      </form>
    </>
  );
};

export default Login;
