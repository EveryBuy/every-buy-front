"use client";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { useRef, useState, useEffect } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  const [persistor, setPersistor] = useState<any>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const p = persistStore(storeRef.current!);
    setPersistor(p);
  }, []);

  if (!persistor) return null;

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
