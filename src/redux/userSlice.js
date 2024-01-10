// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userId: null,
    username: '',
    email: '',
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.username = '';
      state.email = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
