import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {}, // Başlangıç durumu uygun şekilde düzenlendi
  reducers: {
    addToCart: (state, action) => {
      const { userId, product, quantity } = action.payload;

      if (state[userId]) {
        const existingItem = state[userId].find((item) => item.id === product.id);

        if (existingItem) {
          // Eğer ürün zaten sepette varsa sadece miktarını arttır
          existingItem.quantity += quantity;
        } else {
          state[userId].push({ ...product, quantity });
        }
      } else {
        state[userId] = [{ ...product, quantity }];
      }
    },
    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload;

      if (state[userId]) {
        const updatedCart = state[userId].filter((item) => item.id !== productId);
        state[userId] = updatedCart;
      }
    },
    clearCart: (state, action) => {
      const userId = action.payload;
      state[userId] = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
