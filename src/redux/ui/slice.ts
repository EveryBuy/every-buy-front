'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isActiveProfileMenu: true,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleProfileMenu(state, action) {
            state.isActiveProfileMenu = action.payload
        }
    }
})

export const { toggleProfileMenu } = uiSlice.actions;
export const uiStateReducer = uiSlice.reducer;