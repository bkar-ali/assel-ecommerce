"use client";
// #1a2334 #a08559
import React from "react";
import { useEffect, useState } from "react";
import { fetchWatches } from "@/store/asselThunk";
import { useAppDispatch, useAppSelector } from "@/store/asselHooks";
import Image from "next/image";
// Swipers Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// React icons
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { addToWishlist, removeFromWishLis } from "@/store/wishlistSlice";
import { Product } from "@/store/asselTypes";

// onReachEnd={() => setIsEnd(true)}
// onFromEdge={() => { setIsEnd(false); setIsBeginning(false); }}
// onReachBeginning={() => setIsBeginning(true)}

const SliderBanner = () => {
  const [color, setColor] = useState(true);
  const [swiperState, setSwiperState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const dispatch = useAppDispatch();
  const { watches } = useAppSelector((state) => state.assel);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  // const { data, loading, error } = useAppSelector((state) => state.assel);

  useEffect(() => {
    dispatch(fetchWatches());
  }, [dispatch]);
  // if (watches.loading) return <div className="p-5 bg-cyan-400/70">Loading</div>;
  const toggleFav = (product: Product) => {
    const exsist = wishlist.find((item) => item.id === product.id);
    if (exsist) {
      dispatch(removeFromWishLis(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [wishlist]);
  return (
    <div className="mt-10 pt-10 mb-20 relative">
      <div className="px-6 w-full text-textMain mb-5 font-semibold text-xl md:text-2xl underline underline-offset-8 uppercase duration-500">
        Exploer Wathces
      </div>
      <Swiper
        className="rounded-2xl"
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={2.5}
        breakpoints={{
          320: { slidesPerView: 1.2 }, // موبايلات صغيرة
          480: { slidesPerView: 1.5 }, // موبايلات متوسطة
          640: { slidesPerView: 2 }, // تابلت صغير
          1024: { slidesPerView: 2.5 }, // لابتوب أو ديسكتوب صغير
        }}
        // loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        // onBeforeInit={(swiper) => {
        //   (swiper.params.navigation as any).prevEl = ".custom-prev";
        //   (swiper.params.navigation as any).nextEl = ".custom-next";
        // }}
        onReachEnd={() => {
          setSwiperState((prev) => ({ ...prev, isEnd: true }));
        }}
        onReachBeginning={() => {
          setSwiperState((prev) => ({ ...prev, isBeginning: true }));
        }}
        onFromEdge={() => {
          setSwiperState({ isBeginning: false, isEnd: false });
        }}
        // centeredSlides
        // onInit={(swiper) =>
        //   setSwiperState({
        //     isBeginning: swiper.isBeginning,
        //     isEnd: swiper.isEnd,
        //   })
        // }
      >
        {watches.data.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            {/* <Link href={`/details/${item.id}`}> */}
            <div className="bg-bgCard flex-1 min-h-[25vh] my-2 rounded-xl relative flex flex-col px-3 cursor-pointer md:hover:scale-105 hover:shadow-xl duration-500">
              <h2 className="bg-bgMain text-black absolute top-3 left-2 md:left-3 w-[60px] md:w-[80px] py-1 md:p-1 text-xs font-medium rounded-3xl flex justify-center items-center font-sans duration-500">
                {`${Math.floor(item.discountPercentage)}% OFF`}
              </h2>
              <div
                className="absolute -top-1 md:top-0 -right-1 md:right-3 p-5 text-textHeart cursor-pointer text-2xl duration-500"
                onClick={() => toggleFav(item)}
              >
                {wishlist.find((p) => p.id === item.id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              <Link href={`/categores/watches/product/${item.id}`}>
                <div className="mt-6 w-full flex justify-center">
                  <Image
                    src={item.images[0]}
                    width={100}
                    height={100}
                    alt={item.title}
                    className="md:w-[170px] md:h-[170px]"
                    loading="lazy"
                  />
                </div>
                <div className="text-textCard w-full flex flex-col duration-500">
                  <div className="text-[14px] md:text-base">{item.brand}</div>
                  <div className="text-[14px] md:text-base">{item.title}</div>
                  <div className="w-full h-[10vh] flex items-center">
                    <button className="bg-bgMain text-black font-medium w-[200px] h-[] px-3 py-1 rounded-xl mt-2 hover:scale-110 duration-300">
                      Explore More
                    </button>
                    <div className="w-[75%] text-right inline-block text-textPrice font-sans text-base md:text-lg duration-500">
                      $
                      {Math.floor(
                        item.price -
                          item.price * (item.discountPercentage / 100),
                      )}
                      <span className="ml-2 line-through text-textSale opacity-70">
                        ${Math.floor(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-4xl top-9 right-3  md:text-5xl absolute md:top-7 md:right-5">
        <button
          className={`custom-prev 
        ${
          swiperState.isBeginning
            ? "text-black/20 dark:text-[#3c3b3b]"
            : "text-black dark:text-[#b0aeae]"
        }
            duration-300`}
        >
          {<CiCircleChevLeft />}
        </button>
        <button
          onClick={() => setColor(false)}
          className={`custom-next
            ${color ? "!text-textMain" : ""}
                      ${
                        swiperState.isEnd
                          ? "text-black/20 dark:text-[#3c3b3b]"
                          : "text-black dark:text-[#b0aeae]"
                      }
                        duration-300`}
        >
          {<CiCircleChevRight />}
        </button>
      </div>
    </div>
  );
};

export default SliderBanner;
