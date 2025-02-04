"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { messagesReducer } from "./messages/slice";
import { advertisementReducer } from "./advertisement/slice";
// import storage from "redux-persist/lib/storage";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { chatApi } from "./messages/chatApi";
import { filtersReducer } from "./filters/slice";
import { version } from "os";

const createNoopStorage = () => {
	return {
		getItem(_key: any) {
			return Promise.resolve(null);
		},
		setItem(_key: any, value: any) {
			return Promise.resolve(value);
		},
		removeItem(_key: any) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();

const authPersistConfig = {
	key: "root",
	version: 1,
	storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: persistedAuthReducer,
			messages: messagesReducer,
			advertisement: advertisementReducer,
			filters: filtersReducer,
			[chatApi.reducerPath]: chatApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(chatApi.middleware),
	});
};

// export const persistor = persistStore(makeStore)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;