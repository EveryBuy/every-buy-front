import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "@/utils/setAuthToken";
import { ChatsType } from "@/types/messages/messages";
import { RootState } from "@/redux/store";
import axios from "axios";

interface ResponseChatsType {
  data: ChatsType;
}

interface ResponseChatType {
  status: number;
  data: ChatDataTypeExt;
}
interface ChatDataTypeExt {
  data: ChatDataTypeInt;
}
interface ChatDataTypeInt {
  id: number;
  advertisementId: number;
  chatMessages: ChatMessagesType[];
}
interface ChatMessagesType {
  id: number;
  text: string;
  creationTime: string;
  userId: number;
  chatId: number;
  userPhotoUrl: null | string;
}

export const getAllChats = createAsyncThunk(
  "/messages",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;
      if (token) {
        setAuthToken(token);
        const chats: ResponseChatsType = await axios.get(
          "https://service-chat-t47s.onrender.com/chat/get-all-users-chats"
        );

        return chats.data;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const getAllMessagesById = createAsyncThunk(
  "/messages/getMessagesByChatId",
  async (chatId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (token) {
        setAuthToken(token);
        const chat: ResponseChatType = await axios.get(
          `https://service-chat-t47s.onrender.com/chat/${chatId}`
        );

        return chat.data.data.chatMessages;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
