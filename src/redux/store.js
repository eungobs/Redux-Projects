import { configureStore } from '@reduxjs/toolkit';
import itemSlice from '../features/items/itemSlice'; 
import authSlice from '../features/items/authSlice'; 

const store = configureStore({
  reducer: {
    items: itemSlice,
    auth: authSlice, 
  },
});

export default store;

