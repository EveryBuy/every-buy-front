"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // products: productsReducer,
    // filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;

