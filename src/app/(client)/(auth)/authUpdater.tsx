'use client'

import { refreshUser } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/store"
import { useEffect } from "react";

export const AuthUpdater = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(refreshUser())
    }, [dispatch])
    return;
}

export default AuthUpdater;