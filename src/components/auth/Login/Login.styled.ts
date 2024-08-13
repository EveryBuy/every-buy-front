"use client";

import styled from "@emotion/styled";

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
