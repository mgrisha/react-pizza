import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './slices/filterSlice';
import searchSlice from './slices/searchSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    searchSlice,
    cartSlice
  },
});
