"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContextType";
import EyePassword from "@/assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "@/assets/Svg/EyeInvisibleFilled.svg";
import {
  Form,
  InputTitle,
  InputContainer,
  Input,
  SubmitButton,
  TogglePasswordButton,
} from "./Login.styled";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/auth/operations";
import { selectIsLoggedIn, selectToken, selectUser } from '@/redux/auth/selectors';
import { log } from "console";

const Login: React.FC = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  useEffect(() => {   
    isLoggedIn && router.push("/user")
  }, [isLoggedIn])

  // for testing
  // login: "mitskp11@gmail.com",
  // password: "14fgGH7_er$$",

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(
      {
        login: emailOrPhone,
        password: password
      }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputTitle htmlFor="emailOrPhone">Телефон або e-mail</InputTitle>
          <Input
            type="text"
            id="emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            placeholder="Введіть номер телефону або e-mail"
          />
        </InputContainer>
        <InputContainer>
          <InputTitle htmlFor="password">Введіть пароль</InputTitle>
          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введіть пароль"
            />
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
          </div>
        </InputContainer>
        <SubmitButton type="submit">Увійти</SubmitButton>
      </Form>
    </>
  );
};

export default Login;
