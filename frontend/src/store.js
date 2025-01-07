import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice.js'
import cartSlice from './slices/cartSlice.js' 

export const store = configureStore({
  reducer: {
    // rtk quwry setup
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// trk querry overview documentation