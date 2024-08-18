"use client";

import styled from "@emotion/styled";
import Image from "next/image";

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
