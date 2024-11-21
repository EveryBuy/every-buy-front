import { RootState } from '@/redux/store';

export const selectCategories = (state: RootState) => state.advertisement.category;
export const selectTopSubCategories = (state: RootState) => state.advertisement.topSubCategory;
export const selectLowSubCategories = (state: RootState) => state.advertisement.lowSubCategory;
export const selectCityList = (state: RootState) => state.advertisement.cityList;
export const selectMyAdvertisements = (state: RootState) => state.advertisement.myAdvertisements;
export const selectActiveAdvertisement = (state: RootState) => state.advertisement.activeAdvertisement;
export const selectAdvertisementById = (state: RootState) => state.advertisement.advertisementById;
export const selectFavouriteAdvertisements = (state: RootState) => state.advertisement.favouriteAdvertisements;
export const selectUserActiveAdverts = (state: RootState) => state.advertisement.userActiveAdverts;
export const selectUserInactiveAdverts = (state: RootState) => state.advertisement.userInactiveAdverts;
export const isLoading = (state: RootState) => state.advertisement.isLoading;