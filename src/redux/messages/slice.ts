"use client";

import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "./chatApi";
import { FullChatType } from "@/types/messages/chats";

interface InitialStateType {
  chat: FullChatType | null;
  chatId: number | null;
  loading: boolean;
  error: null | string;
}
const initialState: InitialStateType = {
  // chats: [],
  chatId: null,
  chat: null,
  // messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setNewChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addMatcher(
      //   chatApi.endpoints.getChats.matchFulfilled,
      //   (state, { payload }) => {
      //     state.chats = payload;
      //   }
      // )
      .addMatcher(
        chatApi.endpoints.getChat.matchFulfilled,
        (state, { payload }) => {
          state.chat = payload;
        }
      );
    // .addMatcher(
    //   chatApi.endpoints.getMessagesByChatId.matchFulfilled,
    //   (state, { payload }) => {
    //     state.messages = payload;
    //   }
    // );
  },
});

export const messagesReducer = messagesSlice.reducer;
export const { setNewChatId } = messagesSlice.actions;
