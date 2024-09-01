"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActiveProfileMenu: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  selectors: {
    isHiddenProfileMenu: (state) => state.isActiveProfileMenu,
  },
  reducers: {
    toggleProfileMenu(state, action) {
      state.isActiveProfileMenu = action.payload;
    },
  },
});

export const { toggleProfileMenu } = uiSlice.actions;
export const uiStateReducer = uiSlice.reducer;
export const { isHiddenProfileMenu } = uiSlice.selectors;
