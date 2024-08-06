"use client";
import { createContext, FC } from "react";
import { initialValues, useMatchMedia } from "@/hooks/useMatchMedia";

export const MatchMediaContext =
  createContext<MatchedMediaResult>(initialValues);

type Props = { children: React.ReactNode };

export const MatchMediaProvider: FC<Props> = ({ children }) => {
  const values = useMatchMedia();
  return (
    <MatchMediaContext.Provider value={values}>
      {children}
    </MatchMediaContext.Provider>
  );
};
