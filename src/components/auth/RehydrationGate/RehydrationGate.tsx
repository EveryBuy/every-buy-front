"use client";

import { ReactNode } from "react";
import { useAppSelector } from "@/redux/store";
import { selectRehydrated } from "@/redux/auth/selectorsAuth";
import PingBackend from "./PingBackend/PingBackend";

export default function RehydrationGate({ children }: { children: ReactNode }) {
  const isRehydrated = useAppSelector(selectRehydrated);

  if (!isRehydrated) return null;

  return (
    <>
      <PingBackend />
      {children}
    </>
  );
}
