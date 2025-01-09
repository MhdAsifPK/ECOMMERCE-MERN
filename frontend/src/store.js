import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice.js'
import cartSlice from './slices/cartSlice.js' 
import authSlice from './slices/authSlice.js' 

export const store = configureStore({
  reducer: {
    // rtk quwry setup
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSlice,
    auth:authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// trk querry overview documentation