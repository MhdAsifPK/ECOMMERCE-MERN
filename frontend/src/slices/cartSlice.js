import { createSlice } from "@reduxjs/toolkit";
// refresh cheyyumbo data pokaathirikkaan
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] };
const addDecimal = (num) => {
  return num.toFixed(2);
};

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

      //   calculate item price
      state.itemsPrice = addDecimal(
        (state.itemsPrice = state.cartItem.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        ))
      );

      // shipping price
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

      //   calculate tax

      state.taxPrice = addDecimal(0.15 * state.itemsPrice);

      // total price

      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);

      // save local storage in order to ssave te data from lost wen page is refreshed
      localStorage.setItem("cart", JSON.stringify(state));
    },

    deleteToCart: (state, action) => {
      const item = action.payload;
      console.log(item)
      state.cartItem = state.cartItem.filter((x) => x._id !== item._id);
      state.itemsPrice = addDecimal(
        state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimal(0);
      state.taxPrice = addDecimal(0.15 * state.itemsPrice);

      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);

      if (state.cartItem.length == 0) {
        localStorage.clear();
      } else {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    // deleteToCart: (state, action) => {
    //   const id = action.payload;
    //   state.cartItem = state.cartItem.filter((x) => x._id !== id);
    //   state.itemsPrice = addDecimal(
    //     state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0)
    //   );
    //   // Recalculate shipping price
    //   state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

    //   // Recalculate tax price
    //   state.taxPrice = addDecimal(0.15 * state.itemsPrice);

    //   // Recalculate total price
    //   state.totalPrice =
    //     Number(state.itemsPrice) +
    //     Number(state.shippingPrice) +
    //     Number(state.taxPrice);

    //   if (state.cartItems.length == 0) {
    //     localStorage.clear();
    //   }

    //   // Update localStorage to persist changes
    //   else {
    //     localStorage.setItem("cart", JSON.stringify(state));
    //   }
    // },
  },
});

export const { addToCart, deleteToCart } = cartSlice.actions;

export default cartSlice.reducer;
