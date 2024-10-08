"use client";

import {
  createSlice, PayloadAction
} from "@reduxjs/toolkit";
import { register, login, logout, refreshUser, deleteUser, changePassword } from "./operations";
import toast from 'react-hot-toast';
import { AuthResponse, AuthState } from "@/types/stateTypes";



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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.user = {
        userId: null,
        userName: null,
        email: null,
        phone: null,
        userPhotoUrl: null,
      };
      state.token = null;
      state.isLoggedIn = false;
      state.isDeleted = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.rejected, (state, _action: PayloadAction<any>) => {
        state.isLoggedIn = false;
        // here can be error notification like
        // toast.error(`Holly shit happends! Error:${payload}`)
      })
        .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
          // console.log(action.payload);
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
          console.log(state.user);
        })
        .addCase(logout.rejected, (state) => {
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
        })
        .addCase(refreshUser.fulfilled, (state, { payload }) => {
          state.user = payload.data;
          state.token = payload.token;
          state.isLoggedIn = true;
        })
      .addCase(deleteUser.rejected, (state) => {
          toast.error('Something went wrong! Try again late.')
          state.isDeleted = false;
        })
        .addCase(deleteUser.fulfilled, (state, { payload }) => {
          state.isDeleted = true;
          toast.success(payload.data.message)
        })
        .addCase(changePassword.rejected, (state, { payload }) => {
          toast.error('Password not changed!');
        })
        .addCase(changePassword.fulfilled, (state, { payload }) => {
          state.token = payload.token;
          toast.success('Password successful changed!')
        });
  },
});

export const authReducer = authSlice.reducer;
