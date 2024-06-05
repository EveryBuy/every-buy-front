"use client";

import styled from "@emotion/styled";

import "../../styles/_variables.scss";
import "../../styles/_mixins.scss";

export const HeaderTag = styled.header`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--f-size-small);
  border-bottom: 5px solid #f5ffb6;

  @media (max-width: 480px) {
    border-bottom: none;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 60px;

  @media (max-width: 1000px) {
    gap: 10px;
    padding: 16px 30px;
  }
  @media (max-width: 600px) {
    padding: 10px 20px;
  }
  @media (max-width: 480px) {
    padding: 30px 0px 26px;
    justify-content: center;
  }
`;

export const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 59px;
  background-color: #f5ffb6;

  @media (max-width: 480px) {
    height: 35px;
  }
`;

export const List = styled.ul`
  display: flex;
  gap: 60px;

  @media (max-width: 480px) {
    gap: 31px;
  }
`;

export const AddAdvertisingContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 480px) {
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