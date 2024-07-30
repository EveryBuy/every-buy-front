import getTokenLogin from "@/api/getTokenLogin";
import getUserData from "@/api/getUserData";
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
      setHeaderAuthToken(data.token);
      return data;
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
      const { data } = await getTokenLogin(userLogData);
      await API.post("/auth/auth", {
        login: "test@gmail.com",
        password: "kdf{DT'nR(d!/i8r4)+U>Wa",
      });
      setHeaderAuthToken(data.data.token);
      // const userData = await API.get("/user");
      const userData = await getUserData({
        login: "test@gmail.com",
        password: "kdf{DT'nR(d!/i8r4)+U>Wa",
      });
      console.log(userData);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
