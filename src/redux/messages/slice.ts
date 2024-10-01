"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getAllChats } from "../../redux/messages/operations";
import { ChatType } from "@/types/messages/messages";

const initialState: ChatType | [] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload as ChatType;
        }
      })
      .addCase(getAllChats.rejected, (state, action) => {
        const errorMessage = action.payload as string;
        console.error(`Error: ${errorMessage}`);
      });
  },
});

export const messagesReducer = messagesSlice.reducer;
