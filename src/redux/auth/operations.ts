import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearHeaderAuthToken } from "@/utils/axios";
import { setHeaderAuthToken } from "@/utils/axios";
import {
  UserRegData,
  UserLogData,
  UserDeleteData,
  UserChgPwdData,
  ChangePhoneData,
  UserFullName,
  ChangeEmailData,
} from "@/types/stateTypes";
import { API } from "@/utils/axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const register = createAsyncThunk(
  "auth/register",
  async (userRegisterData: UserRegData, thunkAPI) => {
    
    try {
      const response = await API.post("/auth/registration", userRegisterData);
      setHeaderAuthToken(response.data.data.token);
      await delay(4000);
      const userData = await API.get("/user");
      return { data: userData.data.data, token: response.data.data.token };
    } catch (error: any) {
      console.log("Error", error);
      
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
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
      console.log(data);
      return data.data;
      // const userData = await API.get("/user");
      // return { data: userData.data.data, token: data.data.token };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        });
      
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    clearHeaderAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const validate = createAsyncThunk(
  "auth/validate",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.token;
    // console.log("Auth/validate-Token", token);
    if (!token) return thunkAPI.rejectWithValue("No token!");

    try {
      setHeaderAuthToken(token);
      const response = await API.get("auth/validate");
      return response.data;
    } catch (error: any) {
      clearHeaderAuthToken();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth }: any = getState();
      setHeaderAuthToken(auth.token);
      const { data } = await API.get("/user");
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
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
    }
  }
);

export const changeUserPhone = createAsyncThunk(
  "user/changePhone",
  async (changePhoneData: ChangePhoneData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      setHeaderAuthToken(state.auth.token);
      const { data } = await API.put(
        "/auth/change-phone-number",
        changePhoneData
      );
      const token = data.data.token;
      setHeaderAuthToken(token);
      const response = await API.get("/user");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        }
      );
    }
  }
);

export const changeUserEmail = createAsyncThunk(
  "user/changeEmail",
  async (changeEmailData: ChangeEmailData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      setHeaderAuthToken(state.auth.token);
      const response = await API.put("/auth/change-email", changeEmailData);
      console.log(response.data.data.token);
      
      setHeaderAuthToken(response.data.data.token);
      await delay(1000);
      const userData = await API.get("/user");
      return { data: userData.data.data, token: response.data.data.token };

    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        });
    }
  }
);

export const changeUserPhoto = createAsyncThunk(
  "user/changePhoto",
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      setHeaderAuthToken(state.auth.token);
      const response = await API.post("/user/photo-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const subscribeUser = createAsyncThunk(
  "user/subscribe",
  async (email: string, thunkAPI) => {
    console.log("email", email);
    
    try {
      const response = await API.post('/user/add-subscriber', { email } )
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred" ,
        status: error.response?.status || 500,
      })
    }
  }
)

export const unsubscribeUser = createAsyncThunk(
  "user/unsubscribe",
  async (email: string, thunkAPI) => {
    try {
      const response = await API.delete('/user/delete-subscriber', { data: { email } })
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred",
        status: error.response?.status || 500,
      })
    }
  }
)