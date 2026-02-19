import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./asselTypes";

interface CartItemKey {
  id: number;
  size: number;
}

interface cartState {
  items: Product[];
}
const getInitialCart = (): Product[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const initialState: cartState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (!exists) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      if (exists) {
        exists.quantity += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(
        (item) =>
          item.size !== action.payload.size || item.id !== action.payload.id,
      );
    },
    // setCart: (state, action: PayloadAction<Product[]>) => {
    //   state.items = action.payload;
    // },
    increaseQty: (state, action: PayloadAction<CartItemKey>) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size,
      );
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action: PayloadAction<CartItemKey>) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.size === action.payload.size,
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  // export const { addToCart, removeFromCart, setCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
