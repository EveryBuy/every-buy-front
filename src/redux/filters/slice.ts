import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Price = {
        min: number,
        max: number,
    }
export type ProductType = "NEW" | "USED";
export type SortOrder = "ASC" | "DESC";


export type initialState = {
    price: Price,
    productType: ProductType | '',
    sortOrder: SortOrder | '',
    location: string,
    categoryId: number | null,
    subcategoryId: number | null,
    keyword: string,
}

const initialState = {
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
            reducer(state, action: PayloadAction<string>) {
                state.productType = action.payload;
            },
            prepare(productType: string) {
                return {
                    payload: productType,
                }
            },
        },
        addSortOrder: {
            reducer(state, action: PayloadAction<string>) {
                state.sortOrder = action.payload;
            },
            prepare(sortOrder: string) {
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
            },
            prepare(categoryId: number) {
                return {
                    payload: categoryId,
                }
            },
        },
        addSubCategory: {
            reducer(state, action: PayloadAction<number>) {
            },
            prepare(subCategoryId: number) {
                return {
                    payload: subCategoryId,
                }
            },
        },
        addKeyWord: {
            reducer(state, action: PayloadAction<string>) {
            },
            prepare(keyWord: string) {
                return {
                    payload: keyWord,
                }
            },
        },
    }
});

export const { addPrice, addProductType, addSortOrder, addLocation, addCategory, addSubCategory, addKeyWord } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;