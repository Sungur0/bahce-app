// rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order:orderReducer
});

export default rootReducer;
