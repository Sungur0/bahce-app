// favoriteSlice.js

import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: { products: [] },
    reducers: {
        addToFavorites: (state, action) => {
            state.products.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
