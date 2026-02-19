import { configureStore } from "@reduxjs/toolkit";
import asselSlice from "@/store/asselSlice";
import wishlistReducer from "./wishlistSlice";
import cartSlice from "@/store/cartSlice";
import cartStateSlice from "@/store/cartStateSlice";

export const store = configureStore({
  reducer: {
    assel: asselSlice,
    wishlist: wishlistReducer,
    cart: cartSlice,
    showCartState: cartStateSlice,
  },
});

if (typeof window !== "undefined") {
  let prevCart = "";

  store.subscribe(() => {
    const cart = store.getState().cart.items;
    const cartString = JSON.stringify(cart);

    if (cartString !== prevCart) {
      localStorage.setItem("cart", cartString);
      prevCart = cartString;
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
