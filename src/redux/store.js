import { configureStore } from '@reduxjs/toolkit';
import itemSlice from '../features/items/itemSlice'; // Update the path here

const store = configureStore({
  reducer: {
    items: itemSlice,
  },
});

export default store;


