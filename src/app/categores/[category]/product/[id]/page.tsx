"use client";
import StoreNavbar from "@/app/components/StoreNavbar";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/asselHooks";
import { openCart } from "@/store/cartStateSlice";
import { addToCart } from "@/store/cartSlice";
import { CategoryKey, categoryThunkType } from "@/store/asselTypes";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  fetchMen,
  fetchJewelry,
  fetchWatches,
  fetchWomen,
  fetchHeels,
  fetchWomenWatches,
  fetchSneakers,
} from "@/store/asselThunk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Cart from "@/app/components/Cart";
import Sections from "@/app/components/Sections";
import Testimonials from "@/app/components/Testimonials";
import Footer from "@/app/components/Footer";
import SliderBanner from "@/app/components/SliderBanner";
import toast from "react-hot-toast";

const categoryThunk: Record<CategoryKey, categoryThunkType> = {
  men: fetchMen,
  jewelry: fetchJewelry,
  women: fetchWomen,
  watches: fetchWatches,
  sneakers: fetchSneakers,
  heels: fetchHeels,
  womenwatches: fetchWomenWatches,
};
const Page = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [size, setSize] = useState<number | string | null>(null);
  const [choosed, setChoosed] = useState<boolean>(false);

  const clotheSizesArr = ["S", "M", "L", "XL", "2XL", "3XL"];

  const fitsNum = useMemo(() => {
    const arr = [];
    for (let i = 30; i <= 45; i += 1) arr.push(i);
    return arr;
  }, []);

  const watchesSize = useMemo(() => {
    const arr = [];
    for (let i = 14; i <= 20; i += 1) arr.push(i);
    return arr;
  }, []);

  const { id, category } = useParams();
  const assel = useAppSelector((state) => state.assel);
  const dispatch = useAppDispatch();
  // const plusOne = (product: Product) => {
  //   dispatch(increaseQty(product));
  // };

  //Thunk Data
  useEffect(() => {
    if (!category || Array.isArray(category)) return;
    const thunk = categoryThunk[category as CategoryKey];
    dispatch(thunk());
  }, [dispatch, category]);

  // const [showLoader, setShowLoader] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => setShowLoader(false), 2000);
  // }, []);
  // Safty

  //Find Product
  const categoryData = assel[category as keyof typeof assel];
  const product = categoryData.data.find((item) => item.id === +id!);
  const salePrice = useMemo(() => {
    if (product)
      return Math.floor(
        product.price - product.price * (product.discountPercentage / 100),
      );
  }, [product]);

  // if (!product) return <div className="text-white">Not Found</div>;
  if (!category || Array.isArray(category) || !id || Array.isArray(id)) return;

  const handelAddToCart = () => {
    if (!choosed || !product || size === null) return;
    const productWithSize = { ...product, size: size, link: category };
    // dispatch(openCart());
    toast.success("Added To Cart 🛒");
    dispatch(addToCart(productWithSize));
    // console.log(productWithSize);
  };

  type SwitchCategory =
    | "men"
    | "women"
    | "watches"
    | "womenwatches"
    | "jewelry"
    | "sneakers"
    | "heels";

  const sizeNotes = (category: SwitchCategory | string) => {
    switch (category) {
      case "men":
      case "women":
        return "For the best fit, we recommend selecting your size based on both weight and body measurements. If you are between sizes, consider sizing up for a more relaxed fit.";
      case "watches":
      case "womenwatches":
        return "Please make sure to check your wrist size before selecting the watch.";
      case "sneakers":
      case "heels":
        return "We recommend selecting your usual shoe size. If you are between sizes, consider sizing up for a more comfortable fit.";
      case "jewelry":
        return "Please check the diameter and thickness before purchasing to ensure it matches your piercing size.";
    }
  };

  return (
    <>
      {product && (
        <motion.main
          className="pt-20 md:pt-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Cart />
          <StoreNavbar />
          <div className="flex justify-between items-center h-[10vh] px-2 md:px-0 md:hidden text[#a08559] text-textMain w-full md:border-r border-[#212121]/40 dark:border-[#a08559]/40">
            <h1 className="text-xl font-semibold duration-300">
              {product.title}
            </h1>
            <div className="font-sans text-lg text-textPrice">
              {`$${salePrice}`}
              <span className="line-through text-textSale opacity-70 ml-2">{`$${
                product && Math.floor(product.price)
              }`}</span>
            </div>
            {/* <div className="tracking-wider font-sans">{`( ${
              product && Math.floor(product.discountPercentage)
            }% OFF )`}</div> */}
          </div>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={2}
            navigation
            spaceBetween={20}
            pagination={{ clickable: true }}
            centeredSlides={true}
            className="overflow-visible 
        bg[#1a2334] 
        "
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full flex justify-center items-center mb-10">
                  <Image
                    src={img}
                    alt=""
                    width={400}
                    height={400}
                    loading="lazy"
                    className="hover:scale-110 duration-700"
                  ></Image>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="my-7 px-2 md:px-0">
            <div className="w-full min-h-[35vh] bg-bgCard rounded-xl md:rounded-none px-6 py-10 flex flex-col md:flex-row gap-4 duration-300">
              <div className="hidden md:block text[#a08559] text-textMain w-full md:w-1/4 space-y-4 md:border-r md:border-[#212121]/40 md:dark:border-[#a08559]/40">
                <h1 className="text-2xl font-semibold duration-300">
                  {product.title}
                </h1>
                <div className="font-sans text-xl text-textPrice">
                  {`$${salePrice}`}{" "}
                  <span className="line-through text-textSale opacity-70">{`$${
                    product && Math.floor(product.price)
                  }`}</span>
                </div>
                <div className="tracking-wider font-sans">{`( ${
                  product && Math.floor(product.discountPercentage)
                }% OFF )`}</div>
              </div>
              <div className="w-full mb-5 md:mb-0 md:w-1/4 flex justify-center items-center text-textCard tracking-wider font-mono md:border-r border-[#212121]/40 dark:border-[#a08559]/40">
                No Colors Avaliable
              </div>
              <div className="flex flex-col w-full md:w-1/4 md:border-r border-[#212121]/40 dark:border-[#a08559]/40">
                <div className="gap-3 md:gap-1 grid grid-cols-5 h-[80%] w-full mb-3">
                  {(category === "men" ||
                    category === "women" ||
                    category === "jewelry") &&
                    clotheSizesArr.map((num, index) => (
                      <div key={index} className="font-sans">
                        <div
                          onClick={() => {
                            setActiveIndex(index);
                            setChoosed(true);
                            setSize(num);
                          }}
                          className={`cursor-pointer duration-300 ${
                            activeIndex === index
                              ? "text-white bg-[#212121] dark:bg-[#a08559] border border-gray-500 dark:border-[#a08559]"
                              : "text-textMain border border-gray-500 dark:border-[#a08559] hover:bg-gray-300 dark:hover:bg-[#a08559]/70"
                          } duration-500 flex items-center justify-center w-14 h-10`}
                        >
                          {num}
                        </div>
                      </div>
                    ))}
                  {(category === "watches" || category === "womenwatches") &&
                    watchesSize.map((num, index) => (
                      <div key={index} className="font-sans">
                        <div
                          onClick={() => {
                            setActiveIndex(index);
                            setChoosed(true);
                            setSize(num);
                          }}
                          className={`cursor-pointer duration-300 ${
                            activeIndex === index
                              ? "text-white bg-[#212121] dark:bg-[#a08559] border border-gray-500 dark:border-[#a08559]"
                              : "text-textMain border border-gray-500 dark:border-[#a08559] hover:bg-gray-300 dark:hover:bg-[#a08559]/70"
                          } duration-500 flex items-center justify-center w-14 h-10`}
                        >
                          {num}
                          <span className="text-[12px] ml-1">mm</span>
                        </div>
                      </div>
                    ))}
                  {(category === "heels" || category === "sneakers") &&
                    fitsNum.map((num, index) => (
                      <div key={index} className="font-sans">
                        <div
                          onClick={() => {
                            setActiveIndex(index);
                            setChoosed(true);
                            setSize(num);
                          }}
                          className={`cursor-pointer duration-300 ${
                            activeIndex === index
                              ? "text-white bg-[#212121] dark:bg-[#a08559] border border-gray-500 dark:border-[#a08559]"
                              : "text-textMain border border-gray-500 dark:border-[#a08559] hover:bg-gray-300 dark:hover:bg-[#a08559]/70"
                          } duration-500 flex items-center justify-center w-14 h-10`}
                        >
                          {num}
                        </div>
                      </div>
                    ))}
                </div>
                <p className="text-[12px] text-textCard opacity-70 tracking-wider">
                  {sizeNotes(category)}
                </p>
              </div>
              <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                <button
                  onClick={() => {
                    handelAddToCart();
                  }}
                  className={`md:py-5 py-3 w-[65vw] md:w-[15vw]  ${
                    choosed
                      ? "bg-[#212121] dark:bg-[#a08559]/95 cursor-pointer"
                      : " bg-[#212121]/60 dark:bg-[#a08559]/40 cursor-not-allowed"
                  } text-white rounded-[40px] mb-4 duration-500 uppercase font-sans text-sm md:text-base`}
                >
                  {`${
                    choosed ? `Add To Cart - $${salePrice}` : "Select A Size"
                  }`}
                </button>
                <p className="text-textCard opacity-70 text-center text-sm tracking-wider">
                  Free Shipping on Orders over $75 <br />
                  Easy Returns
                </p>
              </div>
            </div>
          </div>
          <Sections />
          <SliderBanner />
          <div className="w-full md:flex justify-center items-center hidden">
            <div className="h-[650px] w-[1600px] relative rounded-3xl overflow-hidden">
              <p className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl z-10 text-white tracking-wider">
                Better Things in a Better Way
              </p>
              <Image
                src={"/images/banner.webp"}
                fill
                loading="lazy"
                alt="Banner"
              />
            </div>
          </div>
          <Testimonials />
          <Footer />
        </motion.main>
      )}
    </>
  );
};

export default Page;
