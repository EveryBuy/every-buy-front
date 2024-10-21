import {
  UserRegData,
  UserLogData,
  UserDeleteData,
  UserChgPwdData,
  ChangePhoneData,
  UserFullName,
  ChangeEmailData,
} from "@/types/stateTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "@/utils/axios";
import { setHeaderAuthToken } from "@/utils/axios";
import { clearHeaderAuthToken } from "@/utils/axios";
import { RootState } from "../store";

export const register = createAsyncThunk(
  "auth/register",
  async (userRegisterData: UserRegData, thunkAPI) => {
    try {
      const { data } = await API.post("/auth/registration", userRegisterData);
      console.log(data);
      setHeaderAuthToken(data.data.token);
      const userData = await API.get("/user");
      return { data: userData.data.data, token: data.data.token };
    } catch (error: any) {
      console.log(error.response.data.error);
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
      console.log(API.defaults.headers.common["Authorization"]);
      const userData = await API.get("/user");
      return { data: userData.data.data, token: data.data.token };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // await API.get("/auth/validate");
    clearHeaderAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth }: any = getState();
      setHeaderAuthToken(auth.token);
      const { data } = await API.get("/user");
      console.log(data.data);
      
      return data.data;
    } catch (error: any) {
      clearHeaderAuthToken();
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth }: any = getState();
      if (!auth.token) {
        return false;
      }
    },
  }
);

export const getDeleteCode = createAsyncThunk(
  "auth/getDeleteCode",
  async (_, thunkApi) => {
    try {
      const { data } = await API.get("/auth/get-code-to-del");
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (deleteData: UserDeleteData, thunkAPI) => {
    try {
      // receive { code, password }
      const { data } = await API.delete("/auth/delete", { data: deleteData });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (changeData: UserChgPwdData, thunkAPI) => {
    try {
      // receive {"oldPassword": "string", "newPassword": "string" }
      const { data } = await API.put("/auth/change-password", changeData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeUserName = createAsyncThunk(
  "user/changeName",
  async (fullName: UserFullName, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      setHeaderAuthToken(state.auth.token);
      const responce = await API.put("/user/update-full-name", fullName);
      return responce.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeUserPhone = createAsyncThunk(
  "user/changePhone",
  async (changePhoneData: ChangePhoneData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      setHeaderAuthToken(state.auth.token);
      const { data } = await API.put("/auth/change-phone-number", changePhoneData);
      const token = data.data.token;
      setHeaderAuthToken(token);
      const response = await API.get("/user");
      console.log(response.data.data);
      
      return response.data.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
)

export const changeUserEmail = createAsyncThunk(
  "user/changeEmail",
  async (changeEmailData: ChangeEmailData, {getState, rejectWithValue}) => {
    try {
  const state = getState() as RootState;
      setHeaderAuthToken(state.auth.token);
  const response = await API.put("/auth/change-email", changeEmailData)
  return response.data;
} catch (error: any) {
  return rejectWithValue(error.message);
}
  }
)

export const changeUserPhoto = createAsyncThunk(
  "user/changePhoto",
  async (formData: FormData, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState
      setHeaderAuthToken(state.auth.token)
      const response = await API.post("/user/photo-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)