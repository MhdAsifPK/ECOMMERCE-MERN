import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart } from "../utils/cartUltils";
// refresh cheyyumbo data pokaathirikkaan
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(item);
      const existingItem = state.cartItem.find((x) => x._id == item._id);
      if (existingItem) {
        state.cartItem = state.cartItem.map((x) => {
          return x._id === existingItem._id ? item : x;
        });
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      console.log("Updated cartItem:", state.cartItem);
      console.log(item);

     return UpdateCart(state)
    },

    deleteToCart: (state, action) => {
      const item = action.payload;
      console.log(item);
      state.cartItem = state.cartItem.filter((x) => x._id !== item);
      return UpdateCart(state)
    },
  },
});

export const { addToCart, deleteToCart } = cartSlice.actions;

export default cartSlice.reducer;
