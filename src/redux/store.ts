"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { messagesReducer } from "./messages/slice";
import { persistReducer } from "redux-persist";
// we don't need it because created variable storage for
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

// create noop storage for cleaning from the mistake
interface NoopStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
const createNoopStorage = (): NoopStorage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<void> {
      return Promise.resolve();
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? require("redux-persist/lib/storage").default
    : createNoopStorage();
//

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    messages: messagesReducer,
    // products: productsReducer,
    // filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// for checking mistakes LS and storage in the Node
// const isStorageAvailable = () => {
//   try {
//     const storageTest = "__storage_test__";
//     localStorage.setItem(storageTest, storageTest);
//     localStorage.removeItem(storageTest);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };
// console.log("Is storage available:", isStorageAvailable());

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
