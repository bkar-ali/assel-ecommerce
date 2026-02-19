// InitStore.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/asselHooks";
import { setWishlist } from "@/store/wishlistSlice";
// import { setCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/asselHooks";

function InitStore({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  // const cart = useAppSelector((state) => state.cart.items);
  useEffect(() => {
    // Wishlist
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      dispatch(setWishlist(JSON.parse(wishlist)));
    }

    // // Cart
    // const cart = localStorage.getItem("cart");
    // if (cart) {
    //   dispatch(setCart(JSON.parse(cart)));
    // }
  }, [dispatch]);

  // Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // // Cart
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  return <>{children}</>;
}
export default InitStore;
