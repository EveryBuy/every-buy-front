// import getData from "@/actions/getData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "@/utils/setAuthToken";
import { ChatType } from "@/types/messages/messages";
import { RootState } from "@/redux/store";
import axios from "axios";

interface ResponseType {
  data: ChatType;
}

export const getAllChats = createAsyncThunk(
  "/messages",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;
      console.log(state.auth.token);

      if (token) {
        setAuthToken(token);
        const messages: ResponseType = await axios.get(
          "https://service-chat-t47s.onrender.com/chat/get-all-users-chats"
        );
        console.log(messages);
        console.log(messages.data);

        return messages.data;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
