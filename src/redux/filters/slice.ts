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
    }
});

export const { addPrice, addProductType, addSortOrder, addLocation, addCategory, addSubCategory, addKeyWord } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;