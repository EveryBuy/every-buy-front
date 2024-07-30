"use client";

import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./operations";

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
    isLoggedIn: false,
    token: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.user = payload.data;
        state.user.isLoggedIn = true;
      });
    // .addCase(logout)
    // .addCase(refreshUser);
  },
});

export const authReducer = authSlice.reducer;
