"use client";

import styled from "@emotion/styled";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 35px;
`;

export const HandleButton = styled.button<{ active: boolean }>`
  padding: 10px 63px;
  border-radius: 10px;
  color: var(--label, #000);
  font-size: 32px;
  font-weight: 400;
  border: none;
  border-bottom: ${(props) => (props.active ? '1px solid var(--label, #000)' : 'none')};
  background-color: transparent;
  cursor: pointer;
`;