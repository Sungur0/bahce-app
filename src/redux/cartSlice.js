// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      state[userId].push(product);
    },
    clearCart: (state, action) => {
      const userId = action.payload;
      state[userId] = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
