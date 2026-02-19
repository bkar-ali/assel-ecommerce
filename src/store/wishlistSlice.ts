import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./asselTypes";

interface wishlistState {
  items: Product[];
}

// const getInitialWishlist = (): Product[] => {
//   if (typeof window === "undefined") return [];
//   const data = localStorage.getItem("wishlist");
//   return data ? JSON.parse(data) : [];
// };

const initialState: wishlistState = {
  items: [],
};

const wishlistSclice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishLis: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});
export const { addToWishlist, removeFromWishLis, setWishlist } =
  wishlistSclice.actions;
export default wishlistSclice.reducer;
