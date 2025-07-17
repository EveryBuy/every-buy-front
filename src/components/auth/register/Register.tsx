"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import FilledIconSrc from "@/assets/Svg/CircleFilled.svg";
import ErrorIconSrc from "@/assets/Svg/CircleError.svg";
import styles from "./Register.module.scss";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import Image from "next/image";
import { register } from "@/redux/auth/operations";
import { selectIsLoggedIn, selectRehydrated } from "@/redux/auth/selectorsAuth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  validatePhone,
  validateEmail,
  validatePassword,
} from "@/utils/validate";
import { SuccessRegisterModal } from "@/components";
import clsx from "clsx";

type ErrorsType = {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successRegisterModalOpen, setSuccessRegisterModalOpen] =
    useState(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const showSuccessRegisterModal = useRef(false);
  const isRehydrated = useAppSelector(selectRehydrated);

  useEffect(() => {
    if (isLoggedIn && !showSuccessRegisterModal.current) {
      router.push("/user");
    } else {
      showSuccessRegisterModal.current = true;
    }
    if (isLoggedIn && showSuccessRegisterModal.current) {
      setSuccessRegisterModalOpen(true);
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      register({
        email: email,
        phone: phone.slice(-9),
        password: password,
      })
    );
  };
  if (!isRehydrated) {
    return 
    (
      <>Йде завантаження.....</>
    );
  }
  const handlePhone = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // TODO:
    // const inputValue = evt.target.value.replace(/\D/g, "");
    // const phoneWithoutPrefix = inputValue.slice(-9);

    setPhone(evt.target.value);

    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   phone: validatePhone(`${evt.target.value}`)
    //     ? ""
    //     : "Невірний формат телефону",
    // }));
  };
  const handlePhoneBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: validatePhone(phone) ? "" : "Невірний формат телефону",
    }));
  };

  const handleEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = evt.target.value;
    setEmail(newEmail);
    // TODO:
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   email: validateEmail(newEmail) ? "" : "Невірний фомат email.",
    // }));
  };

  const handleEmailBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(email) ? "" : "Невірний фомат email.",
    }));
  };

  const handlePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = evt.target.value;

    setPassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(newPassword) ? "" : "Невірний формат паролю.",
    }));
  };

  const handlePasswordBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(password) ? "" : "Невірний формат паролю.",
    }));
  };

  const handleConfirmPass = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPass = evt.target.value;

    setConfirmPassword(newConfirmPass);

    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        password === newConfirmPass ? "" : "Паролі не співпадають.",
    }));
  };

  const changeEyeShowPasswordStatus = () => {
    setShowPassword((prev) => !prev);
  };
  const changeEyeShowConfirmPasswordStatus = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <CommonInput
          typeTitle="phone"
          text="Телефон"
          typeInput={true}
          required={true}
          value={phone}
          setValue={(evt) => handlePhone(evt)}
          setOnBlur={handlePhoneBlur}
          placeholder="введіть номер телефону"
          errorsMessage={
            errors.phone && (
              <span className={styles.errorMessage}>{errors.phone}</span>
            )
          }
        >
          {errors.phone ? (
            <Image
              className={styles.errorImage}
              alt=""
              width={24}
              height={24}
              src={ErrorIconSrc}
            />
          ) : (
            validatePhone(phone) && (
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
          typeTitle="email"
          text="Email"
          typeInput={true}
          value={email}
          required={true}
          setValue={(evt) => handleEmail(evt)}
          setOnBlur={handleEmailBlur}
          placeholder="введіть email"
          errorsMessage={
            errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )
          }
        >
          {errors.email ? (
            <Image
              className={styles.errorImage}
              alt=""
              width={24}
              height={24}
              src={ErrorIconSrc}
            />
          ) : (
            validateEmail(email) && (
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
          setValue={(evt) => handlePassword(evt)}
          setOnBlur={handlePasswordBlur}
          required={true}
          placeholder="введіть свій пароль"
          errorsMessage={
            errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )
          }
        >
          <button
            className={styles.togglePasswordButton}
            type="button"
            onClick={changeEyeShowPasswordStatus}
          >
            <Image
              src={showPassword ? EyePassword : EyeInvisibleFilled}
              alt="Toggle Password Visibility"
              width={24}
              height={24}
            />
          </button>
        </CommonInput>

        <CommonInput
          typeTitle="confirmPassword"
          text="Введіть пароль ще раз"
          typeInput={showConfirmPassword}
          value={confirmPassword}
          setValue={(evt) => handleConfirmPass(evt)}
          required={true}
          placeholder="введіть свій пароль"
          errorsMessage={
            errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword}
              </span>
            )
          }
        >
          <button
            className={styles.toggleConfirmPasswordButton}
            type="button"
            onClick={changeEyeShowConfirmPasswordStatus}
          >
            <Image
              src={showConfirmPassword ? EyePassword : EyeInvisibleFilled}
              alt="Toggle Password Visibility"
              width={24}
              height={24}
            />
          </button>
        </CommonInput>
        <button
          className={clsx(
            styles.submitButton,
            phone && email && password && confirmPassword && styles.activeColor
          )}
          type="submit"
          disabled={
            errors.phone || errors.email || errors.confirmPassword
              ? true
              : false
          }
        >
          Зареєструватись
        </button>
      </form>

      {successRegisterModalOpen && <SuccessRegisterModal />}
    </>
  );
};

export default Register;
