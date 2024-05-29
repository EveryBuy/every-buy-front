"use client";

import styled from "@emotion/styled";

import "../../styles/_variables.scss";
import "../../styles/_mixins.scss";

export const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 59px;
  background: var(--not-active, #f5ffb6);
  @media (max-width: 1439px) {
    height: 45px;
  }

  @media (max-width: 767px) {
    height: 35px;
  }
`;

export const List = styled.ul`
  display: flex;
  gap: 60px;

  @media (max-width: 767px) {
    gap: 31px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1440px;
  padding: 16px 60px;

  @media (max-width: 1439px) {
    width: 768px;
    padding: 12px;
  }

  @media (max-width: 767px) {
    width: 375px;
    justify-content: center;
    padding: 30px 0 26px;
    gap: 20px;
  }
`;

export const AddAdvertisingContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const AddAdvertisingButton = styled.button`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--not-active, #f5ffb6);
  margin-right: 32px;
`;

export const RegisterContainer = styled.div`
  display: flex;
  margin-left: 16px;
`;

export const Line = styled.div`
  width: 100%;
  height: 5px;
  background-color: #f5ffb6;
  @media (max-width: 767px) {
    display: none;
  }
`;
