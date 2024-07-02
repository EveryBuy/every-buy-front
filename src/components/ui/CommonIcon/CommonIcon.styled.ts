"use client";
import { StyledSVGProps } from "@/types/commonIconProps";
import styled from "@emotion/styled";

export const StyledSVG = styled.svg<StyledSVGProps>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  fill: ${({ fill }) => fill || "currentColor"};
`;
