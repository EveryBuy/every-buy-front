import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Lofin-Register-feature/AuthContextType";
import RegisterLoginButtons from "../Register-Login-Buttons/Register-Login-Buttons";
import EyePassword from "../../assets/Svg/EyePassword.svg";
import EyeInvisibleFilled from "../../assets/Svg/EyeInvisibleFilled.svg";
import FilledIconSrc from "../../assets/Svg/CircleFilled.svg";
import ErrorIconSrc from "../../assets/Svg/CircleError.svg";
import {
  Form,
  InputTitle,
  InputContainer,
  Input,
  SubmitButton,
  TogglePasswordButton,
  ErrorMessage,
  ErrorIcon
} from "./Register.styled";
import Image from "next/image";

type ErrorsType = {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string; 
};


const Register: React.FC = () => {
  const { register } = useAuth();
  const router = useRouter();
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
    confirmPassword: ""
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{9,15}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    if (!validatePhone(phone)) {
      newErrors.phone = "невірний формат телефону";
    }

    if (!validateEmail(email)) {
      newErrors.email = "невірний формат e-mail";
    }

    if (!validatePassword(password)) {
      newErrors.password = "Пароль повинен включати: Великі літери: A-Z. Маленькі літери: a-z. Цифри: 0-9. Символи: ~! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/ ";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }

    setErrors(newErrors);

    if (newErrors.phone || newErrors.email || newErrors.password || newErrors.confirmPassword) {
      return;
    }

    try {
      const response = await fetch('https://service-authorization-b1jx.onrender.com/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, phone, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Реєстрація успішна:', data);
        register(phone, email, password);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error('Помилка реєстрації:', errorData);
        setErrors((prevErrors) => ({
          ...prevErrors,
        }));
      }
    } catch (error) {
      console.error('Помилка мережі:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
      }));
    }
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
    } else if (field === "confirmPassword" && password === confirmPassword && confirmPassword !== "") {
      return "valid";
    }
    return "";
  };

  return (
    <div>
      <RegisterLoginButtons />
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputTitle htmlFor="phone">Телефон</InputTitle>
          <div style={{ position: 'relative' }}>
            <Input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={getInputClass("phone")}
              required
              placeholder="Введіть номер телефону"
            />
            {errors.phone ? <ErrorIcon src={ErrorIconSrc} alt="Error" /> : validatePhone(phone) && <ErrorIcon src={FilledIconSrc} alt="Valid" />}
          </div>
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <InputTitle htmlFor="email">Email</InputTitle>
          <div style={{ position: 'relative' }}>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={getInputClass("email")}
              required
              placeholder="Введіть email"
            />
            {errors.email ? <ErrorIcon src={ErrorIconSrc} alt="Error" /> : validateEmail(email) && <ErrorIcon src={FilledIconSrc} alt="Valid" />}
          </div>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <InputTitle htmlFor="password">Введіть пароль</InputTitle>
          <div style={{ position: 'relative' }}>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={getInputClass("password")}
              required
              placeholder="Введіть пароль"
            />
            <TogglePasswordButton type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}>
              <Image src={showPassword ? EyePassword : EyeInvisibleFilled} alt="Toggle Password Visibility" />
            </TogglePasswordButton>
          </div>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <InputTitle htmlFor="confirmPassword">Введіть пароль ще раз</InputTitle>
          <div style={{ position: 'relative' }}>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={getInputClass("confirmPassword")}
              required
              placeholder="Введіть пароль ще раз"
            />
            <TogglePasswordButton type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}>
              <Image src={showConfirmPassword ? EyePassword : EyeInvisibleFilled} alt="Toggle Password Visibility" />
            </TogglePasswordButton>
          </div>
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </InputContainer>
        <SubmitButton type="submit">Зареєструватися</SubmitButton>
      </Form>
    </div>
  );
};

export default Register;
