"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import CommonInput from "@/components/ui/CommonInput/CommonInput";
import styles from "./Login.module.scss";
import Image from "next/image";
import { login } from "@/redux/auth/operations";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import clsx from "clsx";

const Login: React.FC = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    isLoggedIn && router.push("/user");
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      login({
        login: emailOrPhone,
        password: password,
      })
    );
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
          typeInput={true}
          value={emailOrPhone}
          setValue={(e) => setEmailOrPhone(e.target.value)}
          required={true}
          placeholder="введіть телефон або e-mail"
        ></CommonInput>

        <CommonInput
          typeTitle="password"
          text="Введіть пароль"
          typeInput={showPassword}
          value={password}
          required={true}
          setValue={(e) => setPassword(e.target.value)}
          placeholder="введіть пароль"
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
    </>
  );
};

export default Login;
