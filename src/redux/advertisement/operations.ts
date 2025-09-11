import axios from "axios";
import { API, setHeaderAuthToken } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Advertisement } from "./slice";
import { RootState } from "../store";

export const getCategory = createAsyncThunk(
  "advert/getCategory",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/product/category");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTopSubCategory = createAsyncThunk(
  "advert/getTopSubCategory",
  async (categoryId: number, thunkAPI) => {
    try {
      const response = await API.get(
        `/product/category/${categoryId}/top-level-subcategories`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getLowSubCategory = createAsyncThunk(
  "advert/getLowSubCategory",
  async (subcategoryId: number, thunkAPI) => {
    try {
      const response = await API.get(
        `/product/subcategory/${subcategoryId}/low-level-subcategories`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCity = createAsyncThunk(
  "advert/getCity",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/product/city");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getRegion = createAsyncThunk(
  "advert/getRegion",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/product/region");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCitiesByRegionId = createAsyncThunk(
  "advert/getCitiesByRegionId",
  async (regionId: number, thunkAPI) => {
    try {
      const response = await API.get(`/product/region/${regionId}/cities`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createAdvertisement = createAsyncThunk(
  "advert/create",
  async (advertData: FormData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await API.post("/product/create", advertData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      console.log("success", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data ?? error.message);
    }
  }
);

export const updateAdvertisement = createAsyncThunk(
  "advert/update",
  async (updateData: { advertData: Advertisement; id: number }, thunkAPI) => {
    try {
      const { advertData, id } = updateData;
      const response = await API.put(`/product/${id}/update`, advertData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getActiveAdvertisement = createAsyncThunk(
  "advert/getActive",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.get(`/product/${id}/active`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAdvertisementById = createAsyncThunk(
  "advert/getById",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.get(`/product/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAdvertisement = createAsyncThunk(
  "advert/delete",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.delete(`/product/${id}/`);
      return { response, id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAdvertisementStatus = createAsyncThunk(
  "advert/changeStatus",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.put(`/product/${id}/change-status`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAdvertToFavourite = createAsyncThunk(
  "advert/addToFavourite",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.post(`/product/${id}/add-to-favourite`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeAdvertFromFavourite = createAsyncThunk(
  "advert/removeFromFavourite",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.delete(`/product/${id}/remove-from-favourite`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllFavouriteAdvert = createAsyncThunk(
  "advert/getAllFavourite",
  async (params: {}, { rejectWithValue, getState }) => {
    // console.log("Params", params);
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      setHeaderAuthToken(token);
      const endpoint = "/product/favourite-ads";
      const response = await API.get(endpoint, { params: { ...params } });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserActiveAdverts = createAsyncThunk(
  "advert/getUserActive",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      setHeaderAuthToken(token);
      const response = await API.get("/product/user/active-ads");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInactiveAdverts = createAsyncThunk(
  "advert/getUserInactive",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      setHeaderAuthToken(token);
      const response = await API.get("/product/user/inactive-ads");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

let controllerFilter: AbortController | null = null;

export const getFilteredAdverts = createAsyncThunk('advert/getFiltered',
	async (filters: {}, thunkAPI) => {
		try {
			const response = await API.get('/product/filter', {
				params: { ...filters },
			});
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

export const getAdvertsBySellerId = createAsyncThunk('advert/getListBySellerId',
	async (params: { userId: number, section?: string, page?: number, categoryId?: number }, thunkAPI) => {
		type FilterType = { section?: string, page?: number, categoryId?: number }
		const filters: FilterType = params.section ? { section: params.section } : {};
		if (params.page && params.page > 1) filters.page = params.page;
		if (params.categoryId && params.categoryId > 0) filters.categoryId = params.categoryId;
		// console.log("filters", filters);
		try {
			const response = await API.get(`/product/user/${params.userId}/ads`, {
				params: { ...filters },  // , size: 5 - for testing navigation
			});
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)