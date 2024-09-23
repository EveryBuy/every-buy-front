import MessagesBuyType from "@/types/messages/messagesBuy";
import getData from "@/actions/getData";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://api-everybuy.onrender.com",
// });

// const setHeaderAuthToken = (token: string | null) => {
//   API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// const clearHeaderAuthToken = () => {
//   delete API.defaults.headers.common["Authorization"];
// };

export const getAllMessages = createAsyncThunk("/messages", async () => {
  try {
    const messages: MessagesBuyType[] = await getData(
      "/data/messages/messagesBuy.json"
    );
    return messages;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

// export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     await API.get("/auth/validate");
//     clearHeaderAuthToken();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });
