"use client";

import { useEffect } from "react";
import { persistor, useAppDispatch } from "@/redux/store";
import { refreshUser, validate } from "@/redux/auth/operations";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import { usePathname } from "next/navigation";

type Props = {
	children: React.ReactNode;
};

export const AuthUpdater = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	const isLogin = useSelector(selectIsLoggedIn);

	const path = usePathname();

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
		if (isLogin) {
			dispatch(refreshUser());
		} else if (!isLogin && path.includes("/user")) {
			window.location.href = "/login";
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogin]);

	return <>{children}</>;
};

export default AuthUpdater;
