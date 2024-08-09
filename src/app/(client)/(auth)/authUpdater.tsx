'use client'

import { refreshUser } from "@/redux/auth/operations";
import { useAppDispatch } from "@/redux/store"
import { ReactNode, useEffect } from "react";

export const AuthUpdater = ({
  children,
}: {
  children: ReactNode;
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("First ok");
        
        dispatch(refreshUser())
    })
    return <>{ children} </>;
}

export default AuthUpdater;