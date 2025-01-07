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
  changeUserPhoto,
  changeUserEmail,
  subscribeUser,
  unsubscribeUser,
} from "./operations";
import toast from "react-hot-toast";
import {
  AuthResponse,
  AuthState,
  User,
  UserFullName,
} from "@/types/stateTypes";
import { changeNameMessages, changePhoneMessages, unsubscribeMessages } from "@/utils/errorMessages";

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
  error: null,
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
    clearErrors: state => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoggedIn = false;
        state.error = action.payload;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
        state.isLoggedIn = true;
        // console.log(state);
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
      .addCase(changeUserName.pending, (state, _) => {
        state.error = null;
      })
      .addCase(changeUserName.fulfilled, (state, action: PayloadAction<UserFullName>) => {
        state.error = null;
        state.user.fullName = action.payload.fullName;
        toast.success("Name successfully changed!");
      })
      .addCase(changeUserName.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        const message = changeNameMessages(action.payload.status);
        toast.error(message);
      })
      .addCase(changeUserPhone.pending, (state, _) => {
        state.error = null;
      })
      .addCase(changeUserPhone.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        toast.success("Phone successfully changed!");
      })
      .addCase(changeUserPhone.rejected, (state, action: PayloadAction<any>) => {
        // state.error = action.payload;
        const message = changePhoneMessages(action.payload.status)
        toast.error(message);
      })
      .addCase(changeUserEmail.pending, (state, _) => {
        state.error = null;
      })
      .addCase(changeUserEmail.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        toast.success("Email successfully changed!");
      })
      .addCase(changeUserEmail.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(changeUserPhoto.fulfilled, (state, action) => {
        state.user.userPhotoUrl = action.payload.data.userPhotoUrl
      })
      .addCase(changeUserPhoto.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(subscribeUser.fulfilled, (_, action) => {
        toast.success("You are successfully subscribed!")
      })
      .addCase(subscribeUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.message;
      })
      .addCase(unsubscribeUser.fulfilled, (_, action) => {
        toast.success("You are successfully unsubscribed!")
      })
      .addCase(unsubscribeUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.message;
        const message = unsubscribeMessages(action.payload.status);
        toast.error(message);
      })
      ;
  },
});

export const authReducer = authSlice.reducer;
export const {clearErrors} = authSlice.actions;