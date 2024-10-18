"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refreshUser,
  deleteUser,
  changePassword,
  changeUserName,
  changeUserPhone,
} from "./operations";
import toast from "react-hot-toast";
import { AuthResponse, AuthState, User, UserFullName } from "@/types/stateTypes";

const initialState: AuthState = {
  user: {
    userId: null,
    fullName: null,
    phone: null,
    email: null,
    userPhotoUrl: null,
  },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.user = {
        userId: null,
        fullName: null,
        email: null,
        phone: null,
        userPhotoUrl: null,
      };
      state.token = null;
      state.isLoggedIn = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          // console.log(action.payload);
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(register.rejected, (state, _action: PayloadAction<any>) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
        console.log(state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          userId: null,
          fullName: null,
          email: null,
          phone: null,
          userPhotoUrl: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isDeleted = true;
        toast.success(payload.data.message);
      })
      .addCase(deleteUser.rejected, (state) => {
        toast.error("Something went wrong! Try again late.");
        state.isDeleted = false;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        toast.success("Password successfully changed!");
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        toast.error("Password not changed!");
      })
      .addCase(changeUserName.fulfilled, (state, action: PayloadAction<UserFullName>) => {
        state.user.fullName = action.payload.fullName;
        toast.success("Name successfully changed!");
      })
      .addCase(changeUserName.rejected, (_state, action: PayloadAction<any>) => {
        toast.error(action.payload.error);
      })
      .addCase(changeUserPhone.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      ;
  },
});

export const authReducer = authSlice.reducer;
