import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  showCart: boolean;
}

const initialState: cartState = { showCart: false };

const cartStateSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    openCart: (state) => {
      state.showCart = true;
    },
    closeCart: (state) => {
      state.showCart = false;
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { openCart, closeCart, toggleCart } = cartStateSlice.actions;
export default cartStateSlice.reducer;
