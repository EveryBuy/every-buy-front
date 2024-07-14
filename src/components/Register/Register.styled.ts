"use client";

import styled from "@emotion/styled";
import Image from "next/image";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const InputTitle = styled.label`
  color: var(--label);
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  &::after {
    content: " *";
    color: red;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-width: 420px;
`;

export const Input = styled.input`
  width: 420px;
  height: 52px;
  padding: 14px 12px;
  border-radius: 10px;
  border: 2px solid #ccc;

  &.invalid {
    border-color: red;
  }

  &.valid {
    border-color: green;
  }
  &:focus {
    border: 2px solid var(--accent);
    outline: none;
  }
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
