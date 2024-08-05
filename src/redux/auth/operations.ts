import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type UserRegisterData = {
      email: string,
      phone: string,
      password: string,
}

type UserLogData = {
        login: string,
        password: string
}
      
const API = axios.create({
  baseURL: "https://api-everybuy.onrender.com",
});

const setHeaderAuthToken = (token: string) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearHeaderAuthToken = () => {
  delete API.defaults.headers.common["Authorization"];
};


export const register = createAsyncThunk(
  "auth/register",
  async (userRegisterData: UserRegisterData, thunkAPI) => {
    try {
      const { data } = await API.post("/auth/registration", userRegisterData);
      setHeaderAuthToken(data.data.token);
      const userData = await API.get("/user");
      return { data: userData.data.data, token: data.data.token };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//   login: "test@gmail.com",
//   password: "kdf{DT'nR(d!/i8r4)+U>Wa",
export const login = createAsyncThunk(
  "auth/login",
  async (userLogData: UserLogData, thunkAPI) => {
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

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await API.get("/auth/validate");
    clearHeaderAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();

      setHeaderAuthToken(state.auth.token);
      const { data } = await API.get("/user");
      return data.data;
    } catch (error: any) {
      clearHeaderAuthToken();
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);
