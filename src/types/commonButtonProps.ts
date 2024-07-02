import { ReactNode } from "react";

export interface CommonButtonProps {
  type: "submit" | "reset" | "button";
  title: string;
  color: "transparent" | "light-yellow" | "yellow";
  className?: string;
  children?: ReactNode;
}

export interface StyledButtonProps {
  color: "transparent" | "light-yellow" | "yellow";
}
