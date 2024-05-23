"use client";

import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 1410px;
  padding: 16px 0;
`;

export const AddAdvertisingContainer = styled.div`
  display: flex;
  align-items: center;
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
`;
