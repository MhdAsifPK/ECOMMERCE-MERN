import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart } from "../utils/cartUltils";
// refresh cheyyumbo data pokaathirikkaan
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItem: [],
      shippingAddress: { address: "", city: "", postalCode: "", country: "" },
      paymentMethod: "",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // console.log(item);
      const existingItem = state.cartItem.find((x) => x._id == item._id);
      if (existingItem) {
        state.cartItem = state.cartItem.map((x) => {
          return x._id === existingItem._id ? item : x;
        });
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      // console.log("Updated cartItem:", state.cartItem);
      // console.log(item);

      return UpdateCart(state);
    },

    deleteToCart: (state, action) => {
      const item = action.payload;
      console.log(item);
      state.cartItem = state.cartItem.filter((x) => x._id !== item);
      return UpdateCart(state);
    },
    reserCart: (state) => (state = initialState),
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems :(state, action)=>{
      state.cartItem = []
      return UpdateCart(state);
      // localStorage.setItem("cart", JSON.stringify(state));

    },
    savePaymentResult: (state, action) => {
      state.paymentResult = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, deleteToCart, reserCart, saveShippingAddress ,savePaymentMethod,clearCartItems,savePaymentResult} =
  cartSlice.actions;

export default cartSlice.reducer;
