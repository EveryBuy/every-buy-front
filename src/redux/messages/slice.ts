"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getAllMessages } from "./operations";
import MessagesBuyType from "@/types/messages/messagesBuy";

const initialState: MessagesBuyType[] | [] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload as MessagesBuyType[];
        }
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        const errorMessage = action.payload as string;
        console.error(`Error: ${errorMessage}`);
      });
  },
});

export const messagesReducer = messagesSlice.reducer;
