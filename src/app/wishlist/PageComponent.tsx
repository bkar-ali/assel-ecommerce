"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/asselHooks";
import { removeFromWishLis } from "@/store/wishlistSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import StoreNavbar from "../components/StoreNavbar";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import Cart from "../components/Cart";

const PageComponent = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);

  const [price, setPrice] = useState<number[]>([0, 15000]);
  const pricesArr = wishlist.map((p) => Math.floor(p.price));
  const minPrice = pricesArr.length > 0 ? Math.min(...pricesArr) : 0;
  const maxPrice = pricesArr.length > 0 ? Math.max(...pricesArr) + 1 : 0;
  const productFilter = wishlist.filter(
    (p) => p.price >= price[0] && p.price <= price[1],
  );
  useEffect(() => {
    if (wishlist.length > 0) {
      const pricesArr = wishlist.map((p) => Math.floor(p.price));
      setPrice([Math.min(...pricesArr), Math.max(...pricesArr) + 1]);
    } else {
      setPrice([0, 0]);
    }
  }, [wishlist]);

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="px-2 md:px-14 min-h-screen"
      >
        <Cart />
        <StoreNavbar />

        <div className="w-full flex justify-center items-center flex-col mb-5">
          <h1 className="text-textMain pt-32 uppercase text-2xl mb-3">
            Wish List
          </h1>
          <p className="opacity-70 text-textMain tracking-wide text-center">{`supportive, and wildly comfortable, our premium make any outing feel effortless.`}</p>
        </div>
        {/* <div className="w-full flex justify-center items-center flex-col mb-5">
        <p className="text-white/70 tracking-wide">Make Wishes</p>
      </div> */}
        <div className="flex justify-between items-center bg-[#e0dacf] dark:bg-[#1a2334] text-textMain w-full mb-5 h-[8vh] rounded-[30px] px-5 text-sm md:text-xl font-sans duration-300">
          {`Products ( ${productFilter.length} ) `}
          <div className="mr-5 flex">
            <div className="font-sans mr-5 flex items-center justify-center">
              {price[0]}
            </div>
            <div className="flex justify-center items-center font-sans">
              <Box
                sx={{
                  width: {
                    xs: 100, // موبايل
                    sm: 300, // تابلت
                    md: 350, // لابتوب
                    lg: 400, // شاشات كبيرة
                  },
                }}
              >
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={price}
                  onChange={(e, v) => {
                    if (Array.isArray(v)) {
                      setPrice(v);
                    }
                  }}
                  valueLabelDisplay="auto"
                  aria-label="Default"
                  min={minPrice}
                  max={maxPrice}
                  sx={{
                    color: "#a08559", // اللون الأساسي
                    height: 4, // سمك الخط

                    "& .MuiSlider-thumb": {
                      width: 14,
                      height: 14,
                      backgroundColor: "#a08559",
                      transition: "0.3s",
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: "none",
                      },
                    },

                    "& .MuiSlider-track": {
                      backgroundColor: "#a08559",
                      top: "50%",
                      transform: "translateY(-50%)",
                    },

                    "& .MuiSlider-rail": {
                      opacity: 0.3,
                    },
                  }}
                />
              </Box>
            </div>
            <div className="ml-5 font-sans flex items-center justify-center">
              {price[1]}
            </div>
          </div>
        </div>
        {productFilter.length === 0 ? (
          <div className=" text-center min-w-[30vw] min-h-[30vh] flex justify-center items-center text-2xl tracking-widest">
            No Favorites Yet
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
              {productFilter.map((item) => (
                <div
                  key={item.id}
                  className=" group lg:hover:z-50  bg-bgCard p-5 w-full min-h-[50vh] md:min-h-[52vh] flex flex-col rounded-xl relative duration-300"
                >
                  <h2 className="duration-300 text-base bg[#e0dacf] bg-bgMain text-black absolute top-3 left-3 w-[80px] font-medium rounded-3xl flex justify-center items-center font-sans">
                    {`${Math.floor(item.discountPercentage)}% OFF`}
                  </h2>
                  <h2
                    // onClick={() => toggleFav(item.id)}

                    className="cursor-pointer text-xl text-textHeart absolute top-3 -right-1 w-[80px] font-medium rounded-3xl flex justify-center items-center font-sans"
                  >
                    <FaHeart
                      onClick={() => {
                        dispatch(removeFromWishLis(item.id));
                      }}
                    />
                  </h2>
                  {/* <Link href={`/details`}> */}
                  <Link href={`/details/${item.id}`}>
                    <div className="w-full flex justify-center items-center mb-9 mt-2">
                      <Image
                        src={item.images[0]}
                        width={200}
                        height={200}
                        alt=""
                      ></Image>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-textMain px-1 h-[18vh] md:h-[13vh]">
                        <div className="mb-2 text-textCard text-sm md:text-base">
                          {item.brand}
                        </div>
                        <div className="text-sm md:text-base">{item.title}</div>
                        <div className="font-sans text-textPrice my-2 ">
                          ${Math.floor(item.price)}
                          <span className="line-through ml-2 text-textSale opacity-70">
                            $
                            {Math.floor(
                              item.price -
                                item.price * (item.discountPercentage / 100),
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col lg:flex-row gap-1 md:gap-4">
                    <Link
                      href={`/categores/${item.link}/product/${item.id}`}
                      className="mb-2 text-sm md:text-base bg-bgMain text-black font-medium w-full px-3 py-1 md:py-2 rounded-xl mt-2 md:hover:scale-105 duration-300 flex justify-center items-center"
                    >
                      <button>Explore More</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.main>
    </>
  );
};

export default PageComponent;
