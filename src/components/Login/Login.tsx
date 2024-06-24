"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/app/Lofin-Register-feature/AuthContextType';
// import styles from './Login.module.scss';

const Login: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Реальна логіка логіну має бути тут
    login();
    router.push('/');
  };

  return (
    <div >
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="emailOrPhone">Телефон або e-mail</label>
          <input
            type="text"
            id="emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Введіть пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          Введіть свій пароль
        </button>
      </form>
    </div>
  );
};

export default Login;
