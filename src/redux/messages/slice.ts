"use client";

import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "./chatApi";
import { ChatsType, FullChatType } from "@/types/messages/chats";
import { MessageType } from "@/types/messages/messages";

interface InitialStateType {
  chats: ChatsType | [];
  messages: MessageType[];
  chat: FullChatType | [];
  loading: boolean;
  error: null | string;
}
const initialState: InitialStateType = {
  chats: [],
  chat: [],
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
      .addMatcher(
        chatApi.endpoints.getChats.matchFulfilled,
        (state, { payload }) => {
          state.chats = payload;
        }
      )
      .addMatcher(
        chatApi.endpoints.getChat.matchFulfilled,
        (state, { payload }) => {
          state.chat = payload;
        }
      )
      .addMatcher(
        chatApi.endpoints.getMessagesByChatId.matchFulfilled,
        (state, { payload }) => {
          state.messages = payload;
        }
      );
  },
});

export const messagesReducer = messagesSlice.reducer;
