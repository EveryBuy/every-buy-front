"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { refreshUser } from "@/redux/auth/operations";

export const AuthUpdater = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return;
};

export default AuthUpdater;
