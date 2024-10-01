"use client";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { persistStore } from "redux-persist";
import { useRef } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistStore(storeRef.current);
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
