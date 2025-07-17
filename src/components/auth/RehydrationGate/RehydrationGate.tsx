"use client";

import { ReactNode, useEffect, useState } from "react";
import { persistor, useAppSelector } from "@/redux/store";
import { selectRehydrated } from "@/redux/auth/selectorsAuth";

export default function RehydrationGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRehydrated(true); // fallback: не чекаємо нескінченно
    }, 100);

    const unsub = persistor.subscribe(() => {
      const state = persistor.getState();
      if (state.bootstrapped) {
        clearTimeout(timeout);
        setRehydrated(true);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, []);

  return <>{children}</>;
}
