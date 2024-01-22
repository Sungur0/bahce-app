// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      state[userId] = state[userId] ? [...state[userId]] : [];
      const existingProduct = state[userId].find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state[userId].push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload;
      state[userId] = state[userId].filter(product => product.id !== productId);
    },
    decreaseQuantity: (state, action) => {
      const { userId, productId } = action.payload;
      const product = state[userId].find(p => p.id === productId);

      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          const updatedCart = state[userId].filter(p => p.id !== productId);
          state[userId] = updatedCart;
        }
      }
    },
    clearCart: (state, action) => {
      const userId = action.payload;
      state[userId] = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

export const selectTotalPrice = (state, userId) => {
  return state.cart[userId]?.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0) || 0;
};

export const selectTotalDiscountedPrice = (state, userId) => {
  return state.cart[userId]?.reduce((total, product) => {
    return total + product.quantity * (product.price - (product.discount || 0));
  }, 0) || 0;
};

export const selectTotalDiscountAmount = (state, userId) => {
  return state.cart[userId]?.reduce((total, product) => {
    return total + product.quantity * (product.discount || 0);
  }, 0) || 0;
};

export default cartSlice.reducer;
