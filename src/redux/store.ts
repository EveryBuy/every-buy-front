"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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
import { uiStateReducer } from "./ui/slice";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUiReducer = persistReducer(persistConfig, uiStateReducer)

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuthReducer,
      ui: persistedUiReducer,
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