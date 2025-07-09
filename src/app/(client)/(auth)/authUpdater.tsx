"use client";

import { useEffect } from "react";
import { AppStore, useAppDispatch } from "@/redux/store";

import { refreshUser, validate } from "@/redux/auth/operations";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectRehydrated } from "@/redux/auth/selectorsAuth";
import { usePathname } from "next/navigation";


type Props = {
	children: React.ReactNode;
};
export type RootState = ReturnType<AppStore["getState"]>;


export const AuthUpdater = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	const isLogin = useSelector(selectIsLoggedIn);

	const path = usePathname();
	const isRehydrated = useSelector(selectRehydrated);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(validate())
				.unwrap()
				.catch(() => { });
		}, 1000 * 60 * 3);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!isRehydrated) return;
		if (isLogin) {
			dispatch(refreshUser());
		} else if (!isLogin && path.includes("/user")) {
			window.location.href = "/login";
		}
	}, [dispatch, isLogin, isRehydrated, path]);

	return <>{children}</>;
};

export default AuthUpdater;
