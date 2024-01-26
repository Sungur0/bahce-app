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
      password:''
    },
  },
  reducers: {
    login: (state, action) => {
      const { userId, username, email ,password} = action.payload;
      state.isLoggedIn = true;
      state.user = { userId, username, email,password };
    },
    logout: (state) => {  
      state.isLoggedIn = false;
      state.user = {
        userId: null,
        username: '',
        email: '',
        password:'',
      };
    },
    initializeUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const { login, logout, initializeUser } = userSlice.actions;
export default userSlice.reducer;