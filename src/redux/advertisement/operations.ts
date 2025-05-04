import { API, setHeaderAuthToken } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Advertisement } from "./slice";
import { RootState } from "../store";


export const getCategory = createAsyncThunk('advert/getCategory', async (_, thunkAPI) => {
	try {
		const response = await API.get('/ad/category');
		return response.data;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message)
	}
});

export const getTopSubCategory = createAsyncThunk('advert/getTopSubCategory',
	async (categoryId: number, thunkAPI) => {
		try {
			const response = await API.get(`/ad/category/${categoryId}/top-level-subcategories`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	});

export const getLowSubCategory = createAsyncThunk('advert/getLowSubCategory',
	async (subcategoryId: number, thunkAPI) => {
		try {
			const response = await API.get(`/ad/subcategory/${subcategoryId}/low-level-subcategories`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	});

export const getCity = createAsyncThunk('advert/getCity',
	async (_, thunkAPI) => {
		try {
			const response = await API.get('/ad/city');
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	});

export const getRegion = createAsyncThunk('advert/getRegion',
	async (_, thunkAPI) => {
		try {
			const response = await API.get('/ad/region');
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const getCitiesByRegionId = createAsyncThunk('advert/getCitiesByRegionId',
	async (regionId: number, thunkAPI) => {
		try {
			const response = await API.get(`/ad/region/${regionId}/cities`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
)

export const createAdvertisement = createAsyncThunk('advert/create',
	async (advertData, thunkAPI) => {
		try {
			const response = await API.post('/ad/create', advertData, {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			});
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	});

export const updateAdvertisement = createAsyncThunk('advert/update',
	async (updateData: { advertData: Advertisement, id: number }, thunkAPI) => {
		try {
			const { advertData, id } = updateData;
			const response = await API.put(`/ad/${id}/update`, advertData, {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			});
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)

		}
	});

export const getActiveAdvertisement = createAsyncThunk('advert/getActive',
	async (id: number, thunkAPI) => {
		try {
			const response = await API.get(`/ad/${id}/active`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	});

export const getAdvertisementById = createAsyncThunk('advert/getById',
	async (id: number, thunkAPI) => {
		try {
			const response = await API.get(`/ad/${id}`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
);

export const deleteAdvertisement = createAsyncThunk('advert/delete',
	async (id: number, thunkAPI) => {
		try {
			const response = await API.delete(`/ad/${id}/`);
			return { response, id };
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const changeAdvertisementStatus = createAsyncThunk('advert/changeStatus',
	async (id: number, thunkAPI) => {
		try {
			const response = await API.put(`/ad/${id}/change-status`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
);

export const addAdvertToFavourite = createAsyncThunk('advert/addToFavourite',
	async (id: number, thunkAPI) => {
		try {
			const response = await API.post(`/ad/${id}/add-to-favourite`);
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const removeAdvertFromFavourite = createAsyncThunk('advert/removeFromFavourite',
	async (id: number, thunkAPI) => {
		try {
			const response = await API.delete(`/ad/${id}/remove-from-favourite`);
			return id;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const getAllFavouriteAdvert = createAsyncThunk('advert/getAllFavourite',
	async (params: {}, { rejectWithValue, getState }) => {
		// console.log("Params", params);
		try {
			const state = getState() as RootState;
			const token = state.auth.token;
			setHeaderAuthToken(token);
			const endpoint = '/ad/favourite-ads';
			const response = await API.get(endpoint,
				{ params: { ...params } }
			);
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getUserActiveAdverts = createAsyncThunk('advert/getUserActive',
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const token = state.auth.token;
			setHeaderAuthToken(token);
			const response = await API.get('/ad/user/active-ads');
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getUserInactiveAdverts = createAsyncThunk('advert/getUserInactive',
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const token = state.auth.token;
			setHeaderAuthToken(token);
			const response = await API.get('/ad/user/inactive-ads');
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const getFilteredAdverts = createAsyncThunk('advert/getFiltered',
	async (filters: {}, thunkAPI) => {
		try {
			const response = await API.get('/ad/filter', {
				params: { ...filters },
			});
			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)
