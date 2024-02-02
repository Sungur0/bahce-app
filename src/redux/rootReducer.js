// rootReducer.js

import { combineReducers } from 'redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'
import favoriteReducer from './favoriteSlice'
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order:orderReducer,
  favorite:favoriteReducer
});

export default rootReducer;
