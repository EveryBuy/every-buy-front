"use client";

import React, {useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import FilledIconSrc from "@/assets/Svg/CircleFilled.svg";
import ErrorIconSrc from "@/assets/Svg/CircleError.svg";
import styles from "./Register.module.scss";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import Image from "next/image";
import { register } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  validatePhone,
  validateEmail,
  validatePassword,
} from "@/utils/validate";
import CommonModal from "@/components/ui/CommonModal/CommonModal";
import { CommonButton } from "@/components";

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
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const showRegisterModal = useRef(false);

  useEffect(() => {
    if (isLoggedIn && !showRegisterModal.current) {
      router.push("/user");
    } else {
      showRegisterModal.current = true;
    }

    if (isLoggedIn && showRegisterModal.current) {
      setRegisterModalOpen(true);
    }
  }, [isLoggedIn, router]);

  // check before submit
  const handleBlur = (field: string) => {
    const newErrors = { ...errors };

    if (field === "phone") {
      if (!validatePhone(phone)) {
        newErrors.phone = "Невірний формат телефону";
      } else {
        newErrors.phone = "";
      }
    }

    if (field === "email") {
      if (!validateEmail(email)) {
        newErrors.email = "Невірний формат e-mail";
      } else {
        newErrors.email = "";
      }
    }

    if (field === "password") {
      if (!validatePassword(password)) {
        newErrors.password = "Невірний формат пароля";
        // "Пароль повинен включати: Великі літери: A-Z. Маленькі літери: a-z. Цифри: 0-9. Символи: ~!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/ ";
      } else {
        newErrors.password = "";
      }
    }

    if (field === "confirmPassword") {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Паролі не співпадають";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
  };

  // check for submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!validatePhone(phone)) {
      newErrors.phone = "Невірний формат телефону";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Невірний формат e-mail";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        // "Пароль повинен включати: Великі літери: A-Z. Маленькі літери: a-z. Цифри: 0-9. Символи: ~! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/ ";
        "Невірний формат пароля";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }
    setErrors(newErrors);
    if (
      newErrors.phone ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      return;
    }

    dispatch(
      register({
        email: email,
        phone: phone,
        password: password,
      })
    );
  };

  const getInputClass = (field: string) => {
    if (errors[field]) {
      return "invalid";
    } else if (field === "phone" && validatePhone(phone)) {
      return "valid";
    } else if (field === "email" && validateEmail(email)) {
      return "valid";
    } else if (field === "password" && validatePassword(password)) {
      return "valid";
    } else if (
      field === "confirmPassword" &&
      password === confirmPassword &&
      confirmPassword !== ""
    ) {
      return "valid";
    }
    return "";
  };

  const changeEyeShowPasswordStatus = () => {
    setShowPassword((prev) => !prev);
  };
  const changeEyeShowConfirmPasswordStatus = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleClose = () => router.push("/");

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <CommonInput
          typeTitle="phone"
          text="Телефон"
          typeInput="text"
          required={true}
          value={phone}
          setValue={(e) => setPhone(e.target.value)}
          className={getInputClass("phone")}
          placeholder="введіть номер телефону"
          setOnBlur={() => handleBlur("phone")}
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
          typeInput="email"
          value={email}
          required={true}
          setValue={(e) => setEmail(e.target.value)}
          setOnBlur={() => handleBlur("email")}
          className={getInputClass("email")}
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
          setValue={(e) => setPassword(e.target.value)}
          setOnBlur={() => handleBlur("password")}
          className={getInputClass("password")}
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
          setValue={(e) => setConfirmPassword(e.target.value)}
          setOnBlur={() => handleBlur("confirmPassword")}
          className={getInputClass("confirmPassword")}
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
        <button className={styles.submitButton} type="submit">
          Зареєструватись
        </button>
      </form>

      {registerModalOpen && (
          <CommonModal onClose={handleClose}>
            <h3 className={styles.registerModalTitle}>Вітаємо вас!</h3>
            <p className={styles.registerModalText}>Ви успішно зареєструвалися і тепер можете насолоджуватися всіма перевагами нашого сервісу.</p>
            <p className={styles.registerModalText}>Дякуємо за реєстрацію у нашому магазині. Бажаємо вам приємних покупок!</p>
            <CommonButton
                type="button"
                title="Перейти до налаштувань профілю"
                color="yellow"
                className={styles.primaryButton}
                onClick={() => router.push("/user")}
            />
            <CommonButton
                type="button"
                title="Повернутися на головну"
                className={styles.secondaryButton}
                onClick={handleClose}
            />
          </CommonModal>
      )}
    </>
  );
};

export default Register;
