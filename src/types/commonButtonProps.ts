import { ReactNode } from "react";

export default interface CommonButtonProps {
  type: "submit" | "reset" | "button";
  title: string;
  color: "transparent" | "white" | "yellow";
  className?: string;
  children?: ReactNode;
  onClick?: () => void; 
}
