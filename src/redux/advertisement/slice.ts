import { createSlice } from "@reduxjs/toolkit";
import {
	addAdvertToFavourite,
	changeAdvertisementStatus,
	createAdvertisement,
	deleteAdvertisement,
	getActiveAdvertisement,
	getAdvertisementById,
	getAllFavouriteAdvert,
	getCategory,
	getCitiesByRegionId,
	getCity,
	getLowSubCategory,
	getRegion,
	getTopSubCategory,
	getUserActiveAdverts,
	getUserInactiveAdverts,
	removeAdvertFromFavourite,
	updateAdvertisement
} from "./operations";
import { RootState } from "../store";

export type Category = {
	id: number,
	categoryName: string,
	nameUkr: string,
	photoUrl: string
}

export type TopSubCategory = {
	id: number,
	subCategoryName: string,
	subCategoryNameUkr: string,
}

export type LowSubCategory = {
	id: number,
	subCategoryName: string,
	subCategoryNameUkr: string,
}

export type Region = {
	id: number,
	regionName: string,
}

export type City = {
	id: number,
	cityName: string,
	region: Region,
}

export type UserDto = {
	userId: number,
	photoUrl: string,
	fullName: string,
}

export type Advertisement = {
	data: any;
	id: number,
	title: string,
	description: string,
	price: number,
	creationDate: string,
	updateDate?: string,
	isEnabled: boolean,
	userId: number,
	mainPhotoUrl: string,
	photoUrls: string[],
	city: City,
	category: Category,
	topSubCategory: TopSubCategory,
	lowSubCategory: LowSubCategory,
	productType: string,
	section: string,
	deliveryMethods: string[],
	userDto: UserDto,
}

export type FavouriteAdvertisement = {
	advertisementId: number,
	category: Category,
	city: City,
	mainPhotoUrl: string,
	price: number,
	productType: "NEW" | "USED" | "OTHER",
	title: string,
	updateDate: string,
	userId: number,
}

export type AdvertisementState = {
	category: Category[],
	topSubCategory: TopSubCategory[],
	lowSubCategory: LowSubCategory[],
	cityList: City[],
	regionList: Region[],
	citiesListByRegion: City[],
	myAdvertisements: Advertisement[],
	activeAdvertisement: Advertisement | null,
	advertisementById: Advertisement | null,
	favouriteAdvertisements: FavouriteAdvertisement[],
	userActiveAdverts: Advertisement[],
	userInactiveAdverts: Advertisement[],
	isLoading: boolean,
}

const initialState: AdvertisementState = {
	category: [],
	topSubCategory: [],
	lowSubCategory: [],
	cityList: [],
	regionList: [],
	citiesListByRegion: [],
	myAdvertisements: [],
	activeAdvertisement: null,
	advertisementById: null,
	favouriteAdvertisements: [],
	userActiveAdverts: [],
	userInactiveAdverts: [],
	isLoading: false
}

const handlePending = (state: AdvertisementState) => {
	state.isLoading = true;
}

const advertisementSlice = createSlice({
	name: "advertisement",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCategory.pending, handlePending)
			.addCase(getCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.category = action.payload;
			})
			.addCase(getCategory.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getTopSubCategory.pending, handlePending)
			.addCase(getTopSubCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.topSubCategory = action.payload;
			})
			.addCase(getTopSubCategory.rejected, (state, action) => {
				state.isLoading = false;
			})
			.addCase(getLowSubCategory.pending, handlePending)
			.addCase(getLowSubCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.lowSubCategory = action.payload;
			})
			.addCase(getLowSubCategory.rejected, (state, action) => {
				state.isLoading = false;
			})
			.addCase(getCity.pending, handlePending)
			.addCase(getCity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cityList = action.payload.data;
			})
			.addCase(getCity.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getRegion.pending, handlePending)
			.addCase(getRegion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.regionList = action.payload.data;
			})
			.addCase(getRegion.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getCitiesByRegionId.pending, handlePending)
			.addCase(getCitiesByRegionId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.citiesListByRegion = action.payload.data;
			})
			.addCase(getCitiesByRegionId.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(createAdvertisement.pending, handlePending)
			.addCase(createAdvertisement.fulfilled, (state, action) => {
				state.isLoading = false;
				state.myAdvertisements.push(action.payload);
			})
			.addCase(createAdvertisement.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(updateAdvertisement.pending, handlePending)
			.addCase(updateAdvertisement.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.myAdvertisements.findIndex((elem) => elem.id === action.payload.id);
				if (index !== -1) state.myAdvertisements.splice(index, 1, action.payload);
			})
			.addCase(updateAdvertisement.rejected, (state) => {
				state.isLoading = false;
			}).addCase(getActiveAdvertisement.pending, handlePending)
			.addCase(getActiveAdvertisement.fulfilled, (state, action) => {
				state.isLoading = false;
				state.activeAdvertisement = action.payload;
			})
			.addCase(getActiveAdvertisement.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getAdvertisementById.pending, handlePending)
			.addCase(getAdvertisementById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.advertisementById = action.payload;
			})
			.addCase(getAdvertisementById.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteAdvertisement.pending, handlePending)
			.addCase(deleteAdvertisement.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.myAdvertisements = state.myAdvertisements.filter(elem => elem.id !== payload.id);
			})
			.addCase(deleteAdvertisement.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(changeAdvertisementStatus.pending, handlePending)
			.addCase(changeAdvertisementStatus.fulfilled, (state, action) => {

				state.isLoading = false;
				if (action.payload.data.status === false) {
					const advert = state.userActiveAdverts.find(elem => elem.id === action.payload.data.advertisementId);
					const index = state.userActiveAdverts.findIndex(elem => elem.id === action.payload.data.advertisementId);
					if (advert) state.userInactiveAdverts.push(advert);
					state.userActiveAdverts.splice(index, 1);
				} else {
					const advert = state.userInactiveAdverts.find(elem => elem.id === action.payload.data.advertisementId);
					const index = state.userInactiveAdverts.findIndex(elem => elem.id === action.payload.data.advertisementId);
					if (advert) state.userActiveAdverts.push(advert);
					state.userInactiveAdverts.splice(index, 1);
				}

			})
			.addCase(changeAdvertisementStatus.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(addAdvertToFavourite.pending, handlePending)
			.addCase(addAdvertToFavourite.fulfilled, (state, action) => {
				state.isLoading = false;
				state.favouriteAdvertisements.push(action.payload);
			})
			.addCase(addAdvertToFavourite.rejected, state => {
				state.isLoading = false;
			})
			.addCase(removeAdvertFromFavourite.pending, handlePending)
			.addCase(removeAdvertFromFavourite.fulfilled, (state, action: any) => {

				const id = action.payload;
				state.isLoading = false;
				state.favouriteAdvertisements = state.favouriteAdvertisements.filter((elem) => elem.advertisementId !== id);
				console.log(state.favouriteAdvertisements);
			})
			.addCase(removeAdvertFromFavourite.rejected, state => {
				state.isLoading = false;
			})
			.addCase(getAllFavouriteAdvert.pending, handlePending)
			.addCase(getAllFavouriteAdvert.fulfilled, (state, action) => {
				state.isLoading = false;
				state.favouriteAdvertisements = action.payload.data;
			})
			.addCase(getAllFavouriteAdvert.rejected, state => {
				state.isLoading = false;
				state.favouriteAdvertisements = [];
			})
			.addCase(getUserActiveAdverts.pending, handlePending)
			.addCase(getUserActiveAdverts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.userActiveAdverts = action.payload.data;
			})
			.addCase(getUserActiveAdverts.rejected, state => {
				state.isLoading = false;
			})
			.addCase(getUserInactiveAdverts.pending, handlePending)
			.addCase(getUserInactiveAdverts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.userInactiveAdverts = action.payload.data;
			})
			.addCase(getUserInactiveAdverts.rejected, state => {
				state.isLoading = false;
			})
	},
})

export const advertisementReducer = advertisementSlice.reducer;