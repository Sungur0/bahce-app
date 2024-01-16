// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;

      // Eğer kullanıcının sepeti zaten oluşturulmuşsa, mevcut ürünleri kontrol et
      if (state[userId]) {
        // Eğer ürün daha önce eklenmemişse, ekleyin
        if (product && product.id && !state[userId].some((item) => item.id === product.id)) {
          state[userId].push(product);
        }
      } else {
        // Eğer kullanıcının sepeti henüz oluşturulmamışsa, yeni bir dizi oluştur
        state[userId] = product ? [product] : [];
      }
    },
    clearCart: (state, action) => {
      const userId = action.payload;
      state[userId] = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
