// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: {
      userId: null,
      username: '',
      email: '',
    },
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        userId: null,
        username: '',
        email: '',
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
