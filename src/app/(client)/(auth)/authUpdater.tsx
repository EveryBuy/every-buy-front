"use client";

import { useEffect } from "react";
import { AppStore, useAppDispatch, useAppSelector } from "@/redux/store";
import { refreshUser, validate } from "@/redux/auth/operations";
import { selectIsLoggedIn, selectRehydrated } from "@/redux/auth/selectorsAuth";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
export type RootState = ReturnType<AppStore["getState"]>;

export const AuthUpdater = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLoggedIn);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(validate())
        .unwrap()
        .catch(() => {});
    }, 1000 * 60 * 3); // кожні 3 хв

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    if (!isLogin && path.startsWith("/user")) {
      router.replace("/login");
    }
  }, [isLogin, path, router]);


  return <>{children}</>;
};

export default AuthUpdater;
