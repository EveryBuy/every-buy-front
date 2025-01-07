import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Price = {
        min: number,
        max: number,
    }
export type ProductType = "NEW" | "USED";
export type SortOrder = "ASC" | "DESC";


export type InitialState = {
    price: Price,
    productType: ProductType | '',
    sortOrder: SortOrder | '',
    location: string,
    categoryId: number | null,
    subcategoryId: number | null,
    keyword: string,
    regionId: number | null,
    topSubCateroryId: number | null,
    lowSubCategoryId: number | null,
    page: number,
}

const initialState: InitialState = {
    price: {
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
    topSubCateroryId: null,
    lowSubCategoryId: null,
    page: 1,
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
            reducer(state, action: PayloadAction<number>) {
                state.categoryId = action.payload;
            },
            prepare(categoryId: number) {
                return {
                    payload: categoryId,
                }
            },
        },
        addSubCategory: {
            reducer(state, action: PayloadAction<number>) {
                state.subcategoryId = action.payload;
            },
            prepare(subCategoryId: number) {
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
            reducer(state, action: PayloadAction<number>) {
                state.regionId = action.payload;
            },
            prepare(regionId: number) {
                return {
                    payload: regionId, 
                }
            },
        },
        addTopSubCateroryId: {
            reducer(state, action: PayloadAction<number>) {
                state.topSubCateroryId = action.payload;
            },
            prepare(topSubCateroryId: number) {
                return {
                    payload: topSubCateroryId,
                }
            }
        },
        addLowSubCategoryId: {
            reducer(state, action: PayloadAction<number>) {
                state.lowSubCategoryId = action.payload;
            },
            prepare(lowSubCategoryId: number) {
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
        resetFilters(state, _) {
            state.price.min = 0,
                state.price.max = 100000,
                state.productType = '';
                state.sortOrder = '';
                state.location = '';
                state.categoryId = null;
                state.subcategoryId = null;
                state.regionId = null;
                state.topSubCateroryId = null;
                state.lowSubCategoryId = null;
                state.page = 1;
            },
        
    }
});

export const {
    addPrice,
    addProductType,
    addSortOrder,
    addLocation,
    addCategory,
    addSubCategory,
    addKeyWord,
    addRegionId,
    addTopSubCateroryId,
    addLowSubCategoryId,
    addPage,
    resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;