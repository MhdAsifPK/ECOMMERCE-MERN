import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] };

  const addDecimal =(num)=>{
    return num.toFixed(2)
  };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItem.find((x) => x._id == item._id);
      if (existingItem) {
        state.cartItem = state.cartItem.map((x) => {
          x._id === existingItem ? item : x;
        });
      } else {
        state.cartItem = [...state.cartItem, item];
      }

    //   calculate item price 
      state.itemsPrice=addDecimal(state.itemsPrice = state.cartItem.reduce((acc,item)=>acc+item.price*item.qty,0));

      // shipping price
      state.shippingPrice = addDecimal(state.itemsPrice>100?0:10)

    //   calculate tax

    state.taxPrice=addDecimal(0.15*state.itemsPrice)

    // total price

    state.totalPrice=Number(state.itemsPrice)+
    Number(state.shippingPrice)+Number(state.taxPrice)

    // save local storage in order to ssave te data from lost wen page is refreshed
    localStorage.setItem("cart", JSON.stringify(state));
    },
  
  },
});

export const {addToCart}= cartSlice.actions;

export default cartSlice.reducer;
