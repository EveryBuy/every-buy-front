import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "https://api-everybuy.onrender.com",
});

const setHeaderAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearHeaderAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};

export const register = createAsyncThunk(
  "auth/register",
  async (userRegisterData, thunkAPI) => {
    try {
      const { data } = await API.post("/auth/registration", userRegisterData);
      setHeaderAuthToken(data.data.token);
      const userData = await API.get("/auth/validate");
      return { data: userData.data.data, token: data.data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// {
//   login: "test@gmail.com",
//   password: "kdf{DT'nR(d!/i8r4)+U>Wa",
// }
// ("test@gmail.com", "kdf{DT'nR(d!/i8r4)+U>Wa")

export const login = createAsyncThunk(
  "auth/login",
  async (userLogData, thunkAPI) => {
    try {
      const { data } = await API.post("/auth/auth", userLogData);
      setHeaderAuthToken(data.data.token);
      const userData = await API.get("/user");
      return { data: userData.data.data, token: data.data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
