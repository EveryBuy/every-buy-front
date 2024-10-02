"use client";

import { createSlice } from "@reduxjs/toolkit";
import { getAllChats, getAllMessagesById } from "./operations";
import { ChatsType } from "@/types/messages/messages";

// const initialState: ChatsType | [] = [];
interface ChatMessagesType {
  id: number;
  text: string;
  creationTime: string;
  userId: number;
  chatId: number;
  userPhotoUrl: null | string;
}
interface InitialStateType {
  chats: ChatsType | [];
  messages: ChatMessagesType[];
  loading: boolean;
  error: null | string;
}
const initialState: InitialStateType = {
  chats: [],
  messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload || [];
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "An error occurred";
        console.error(`${state}`);
        console.error(`Error: ${state.error}`);
      })
      //
      .addCase(getAllMessagesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMessagesById.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload || [];
      });
  },
});

export const messagesReducer = messagesSlice.reducer;
