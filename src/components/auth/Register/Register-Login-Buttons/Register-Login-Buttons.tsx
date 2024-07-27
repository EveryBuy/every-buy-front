"use client";

import React from 'react';
import { useRouter,usePathname } from 'next/navigation';
// import styled from '@emotion/styled';
import { ButtonContainer,HandleButton } from './Register-Login-Buttons.styled';

const RegisterLoginButtons: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <ButtonContainer>
      <HandleButton 
        onClick={handleRegister}
        active={currentPath === '/register'}
      >
        Реєстрація
      </HandleButton>
      <HandleButton 
        onClick={handleLogin}
        active={currentPath === '/login'}
      >
        Вхід
      </HandleButton>
    </ButtonContainer>
  );
};

export default RegisterLoginButtons;