"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { uiStateReducer } from "./ui/slice";

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
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedUiReducer = persistReducer(persistConfig, uiStateReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuthReducer,
      // ui: persistedUiReducer,
      // products: productsReducer,
      // filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

// export const persistor = persistStore(makeStore)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;