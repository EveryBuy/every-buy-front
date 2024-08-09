"use client";

import {
  createSlice,
} from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";
import { AuthState } from "@/types/stateType";

const initialState: AuthState = {
  user: {
    userId: null,
    userName: null,
    email: null,
    phone: null,
    userPhotoUrl: null,
  },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice<CreateSlice>({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          userId: null,
          userName: null,
          email: null,
          phone: null,
          userPhotoUrl: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = authSlice.reducer;
