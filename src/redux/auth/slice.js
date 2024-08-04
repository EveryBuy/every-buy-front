"use client";

import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const handleRejected = (state, { payload }) => {
  state.isLoggedIn = false;
  // here can be error notification like
  // toast.error(`Holly shit happends! Error:${payload}`)
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      userId: null,
      userName: null,
      email: null,
      phone: null,
      userPhotoUrl: null,
    },
    token: null,
    isLoggedIn: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.rejected, handleRejected)
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
