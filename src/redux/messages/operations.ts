import MessagesBuyType from "@/types/messages/messagesBuy";
import getData from "@/actions/getData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = axios.create({
//   baseURL: "https://service-chat-t47s.onrender.com",
// });
// const setHeaderAuthToken = (token: string | null) => {
//   API.defaults.headers.common["Authorization"] = `${token}`;
// };
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// const clearHeaderAuthToken = () => {
//   delete API.defaults.headers.common["Authorization"];
// };

export const getAllMessages = createAsyncThunk("/messages", async () => {
  try {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNTYsInBob25lIjoiNjMwNjMwNjMwIiwicm9sZXMiOlsiVVNFUiJdLCJzdWIiOiJleGFtcGxlNzc3QGV4YW1wbGUuY29tIiwiaWF0IjoxNzI3NDUwNjY0LCJleHAiOjE3Mjc1MzcwNjR9.tIcSugTAa3oB4Vk9bFMH7OPC3N-QdDa8SDwzfX6skMg";
    if (token) {
      // setHeaderAuthToken(token);
      setAuthToken(token);
      const messages: MessagesBuyType[] = await axios.get(
        "https://service-chat-t47s.onrender.com/chat/get-all-users-chats"
      );
      console.log(token);

      console.log(messages);

      return messages.data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
});
