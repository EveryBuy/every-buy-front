"use client";

import styled from "@emotion/styled";
import Image from "next/image";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const TogglePasswordButton = styled.button`
  margin-left: 8px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 20px 185px;
  gap: 10px;
  border-radius: 10px;
  margin-top: 36px;
  background: var(--not-active, #f5ffb6);
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const ErrorIcon = styled(Image)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
