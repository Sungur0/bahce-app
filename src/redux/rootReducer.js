// rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
