"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import FilledIconSrc from "@/assets/Svg/CircleFilled.svg";
import ErrorIconSrc from "@/assets/Svg/CircleError.svg";
import {
  Form,
  SubmitButton,
  TogglePasswordButton,
  ErrorMessage,
  ErrorIcon,
} from "./Register.styled";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import Image from "next/image";
import { register } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { validatePhone, validateEmail, validatePassword } from "@/utils/validate";

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
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    isLoggedIn && router.push("/user");
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!validatePhone(phone)) {
      newErrors.phone = "невірний формат телефону";
    }
    if (!validateEmail(email)) {
      newErrors.email = "невірний формат e-mail";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Пароль повинен включати: Великі літери: A-Z. Маленькі літери: a-z. Цифри: 0-9. Символи: ~! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/ ";
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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CommonInput
          typeTitle="phone"
          text="Телефон"
          typeInput="text"
          value={phone}
          setValue={(e) => setPhone(e.target.value)}
          className={getInputClass("phone")}
          placeholder="Введіть номер телефону"
        >
          {errors.phone ? (
            <ErrorIcon src={ErrorIconSrc} alt="Error" />
          ) : (
            validatePhone(phone) && (
              <ErrorIcon src={FilledIconSrc} alt="Valid" />
            )
          )}
        </CommonInput>

        <CommonInput
          typeTitle="email"
          text="Email"
          typeInput="email"
          value={email}
          setValue={(e) => setEmail(e.target.value)}
          className={getInputClass("email")}
          placeholder="Введіть email"
          errorsMessage={
            errors.email && <ErrorMessage>{errors.email}</ErrorMessage>
          }
        >
          {errors.email ? (
            <ErrorIcon src={ErrorIconSrc} alt="Error" />
          ) : (
            validateEmail(email) && (
              <ErrorIcon src={FilledIconSrc} alt="Valid" />
            )
          )}
        </CommonInput>

        <CommonInput
          typeTitle="password"
          text="Введіть пароль"
          typeInput={showPassword ? "text" : "password"}
          value={password}
          setValue={(e) => setPassword(e.target.value)}
          className={getInputClass("password")}
          required={true}
          placeholder="Введіть пароль"
          errorsMessage={
            errors.password && <ErrorMessage>{errors.password}</ErrorMessage>
          }
        >
          <TogglePasswordButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Image
              src={showPassword ? EyePassword : EyeInvisibleFilled}
              alt="Toggle Password Visibility"
            />
          </TogglePasswordButton>
        </CommonInput>

        <CommonInput
          typeTitle="confirmPassword"
          text="Введіть пароль ще разь"
          typeInput={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          setValue={(e) => setConfirmPassword(e.target.value)}
          className={getInputClass("confirmPassword")}
          required={true}
          placeholder="Введіть пароль ще раз"
          errorsMessage={
            errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )
          }
        >
          <TogglePasswordButton
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Image
              src={showConfirmPassword ? EyePassword : EyeInvisibleFilled}
              alt="Toggle Password Visibility"
            />
          </TogglePasswordButton>
        </CommonInput>
        <SubmitButton type="submit">Зареєструватися</SubmitButton>
      </Form>
    </>
  );
};

export default Register;
