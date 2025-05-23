import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Price = {
	min: number,
	max: number,
}
export type ProductType = "NEW" | "USED" | "OTHER";
export type SortOrder = "ASC" | "DESC";


export type InitialState = {
	price: Price,
	limitPrice: Price,
	productType: ProductType | '',
	sortOrder: SortOrder | '',
	location: string,
	categoryId: number | null,
	subcategoryId: number | null,
	keyword: string,
	regionId: number | null,
	cityId: number | null,
	topSubCategoryId: number | null,
	lowSubCategoryId: number | null,
	page: number,
	section: "SELL" | "BUY",
}

const initialState: InitialState = {
	price: {
		min: 0,
		max: 100000,
	},
	limitPrice: {
		min: 0,
		max: 100000,
	},
	productType: '',
	sortOrder: '',
	location: '',
	categoryId: null,
	subcategoryId: null,
	keyword: '',
	regionId: null,
	cityId: null,
	topSubCategoryId: null,
	lowSubCategoryId: null,
	page: 1,
	section: "SELL",
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		addPrice: {
			reducer(state, action: PayloadAction<Price>) {
				state.price = action.payload;
			},
			prepare(price: Price) {
				return {
					payload: price,
				}
			},
		},
		addLimitPrice: {
			reducer(state, action: PayloadAction<Price>) {
				state.limitPrice = action.payload;
			},
			prepare(limitPrice: Price) {
				return {
					payload: limitPrice,
				}
			},
		},
		addProductType: {
			reducer(state, action: PayloadAction<ProductType | ''>) {
				state.productType = action.payload;
			},
			prepare(productType: ProductType | '') {
				return {
					payload: productType,
				}
			},
		},
		addSortOrder: {
			reducer(state, action: PayloadAction<SortOrder | ''>) {
				state.sortOrder = action.payload;
			},
			prepare(sortOrder: SortOrder | '') {
				return {
					payload: sortOrder,
				}
			},
		},
		addLocation: {
			reducer(state, action: PayloadAction<string>) {
				state.location = action.payload;
			},
			prepare(location: string) {
				return {
					payload: location,
				}
			},
		},
		addCategory: {
			reducer(state, action: PayloadAction<number | null>) {
				state.categoryId = action.payload;
			},
			prepare(categoryId: number | null) {
				return {
					payload: categoryId,
				}
			},
		},
		addSubCategory: {
			reducer(state, action: PayloadAction<number | null>) {
				state.subcategoryId = action.payload;
			},
			prepare(subCategoryId: number | null) {
				return {
					payload: subCategoryId,
				}
			},
		},
		addKeyWord: {
			reducer(state, action: PayloadAction<string>) {
				state.keyword = action.payload;
			},
			prepare(keyWord: string) {
				return {
					payload: keyWord,
				}
			},
		},
		addRegionId: {
			reducer(state, action: PayloadAction<number | null>) {
				state.regionId = action.payload;
			},
			prepare(regionId: number | null) {
				return {
					payload: regionId,
				}
			},
		},
		addCityId: {
			reducer(state, action: PayloadAction<number | null>) {
				state.cityId = action.payload;
			},
			prepare(cityId: number | null) {
				return {
					payload: cityId,
				}
			},
		},
		addTopSubCategoryId: {
			reducer(state, action: PayloadAction<number | null>) {
				state.topSubCategoryId = action.payload;
			},
			prepare(topSubCateroryId: number | null) {
				return {
					payload: topSubCateroryId,
				}
			}
		},
		addLowSubCategoryId: {
			reducer(state, action: PayloadAction<number | null>) {
				state.lowSubCategoryId = action.payload;
			},
			prepare(lowSubCategoryId: number | null) {
				return {
					payload: lowSubCategoryId,
				}
			}
		},
		addPage: {
			reducer(state, action: PayloadAction<number>) {
				state.page = action.payload;
			},
			prepare(page: number) {
				return {
					payload: page,
				}
			}
		},
		addSection: {
			reducer(state, action: PayloadAction<'SELL' | 'BUY'>) {
				state.section = action.payload;
			},
			prepare(section: 'SELL' | 'BUY') {
				return {
					payload: section,
				}
			}
		},
		resetFilters(state, _) {
			state.price.min = state.limitPrice.min || 0;
			state.price.max = state.limitPrice.max || 100000;
			state.productType = '';
			state.sortOrder = '';
			state.location = '';
			state.categoryId = null;
			state.subcategoryId = null;
			state.regionId = null;
			state.cityId = null;
			state.topSubCategoryId = null;
			state.lowSubCategoryId = null;
			state.page = 1;
		},

	}
});

export const {
	addPrice,
	addLimitPrice,
	addProductType,
	addSortOrder,
	addLocation,
	addCategory,
	addSubCategory,
	addKeyWord,
	addRegionId,
	addCityId,
	addTopSubCategoryId,
	addLowSubCategoryId,
	addPage,
	addSection,
	resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;