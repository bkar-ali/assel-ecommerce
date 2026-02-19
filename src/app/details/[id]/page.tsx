"use client";
//? #1a2334 #a08559
import { useAppSelector, useAppDispatch } from "@/store/asselHooks";
import { addToCart } from "@/store/cartSlice";
import { openCart } from "@/store/cartStateSlice";
import { useParams } from "next/navigation";
import StoreNavbar from "@/app/components/StoreNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Cart from "@/app/components/Cart";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import Sections from "@/app/components/Sections";
import Testimonials from "@/app/components/Testimonials";
import Footer from "@/app/components/Footer";

// interface sizes {
//   id: string;
//   fit: number;
// }

// const size: sizes[] = [{ id: uuidv4(), fit: 5 }];
// interface detailsPRoduct {
//   params: {
//     id: string;
//   };
// }
// { params }: detailsPRoduct

const Page = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [choosed, setChoosed] = useState<boolean>(false);
  const [size, setSize] = useState<number | null>(null);
  // const [showLoader, setShowLoader] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => setShowLoader(false), 2000);
  // }, []);
  const dispatch = useAppDispatch();
  const fitsNum = [];
  for (let i = 5; i <= 11; i += 0.5) {
    fitsNum.push(i);
  }
  const params = useParams();
  const productId = params?.id;
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const product = wishlist.find((item) => item.id === +productId!);

  const salePrice =
    product &&
    Math.floor(
      product.price - product.price * (product.discountPercentage / 100),
    );
  const handelAddToCart = () => {
    if (!choosed || !product || size === null) return;
    const productWithSize = { ...product, size: size };
    dispatch(openCart());
    dispatch(addToCart(productWithSize));
  };
  // if (watches.loading)
  //   return <div className="p-5 bg-cyan-400/70 h-[40vh]">Loading</div>;
  return (
    <>
      {
        <motion.main
          className="pt-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Cart />
          <StoreNavbar />
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
            {product &&
              product.images.map((img) => (
                <SwiperSlide key={uuidv4()}>
                  <div className="w-full flex justify-center items-center mb-10">
                    <Image
                      src={img}
                      alt=""
                      width={400}
                      height={400}
                      className="hover:scale-110 duration-700"
                    ></Image>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="my-7">
            <div className="w-full h-[35vh] bg-bgCard px-6 py-10 flex flex-row">
              <div className="text[#a08559] text-textMain w-1/4 space-y-4">
                <h1 className="text-2xl font-semibold ">{product?.title}</h1>
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
              <div className=" w-1/4 flex justify-center items-center text-textCard font-mono border-r border-[#212121]/40 dark:border-[#a08559]/40">
                No Colors Avaliable
              </div>
              <div className="flex flex-col w-1/4 border-r border-[#212121]/40 dark:border-[#a08559]/40">
                <div className="gap-1 grid grid-cols-5 h-[80%] w-full">
                  {fitsNum.map((num, index) => (
                    <div key={index} className="font-sans">
                      <div
                        onClick={() => {
                          setActiveIndex(index);
                          setChoosed(true);
                          setSize(num);
                        }}
                        className={`cursor-pointer ${
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
                  Tree Breezer is soft and stretchy. Most find their usual size
                  fits well, though the toe box may feel snug at first
                </p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center">
                <button
                  onClick={() => {
                    handelAddToCart();
                  }}
                  className={`px-28 py-3 ${
                    choosed
                      ? "bg-[#212121] dark:bg-[#a08559]/95 cursor-pointer"
                      : " bg-[#212121]/60 dark:bg-[#a08559]/40 cursor-not-allowed"
                  } text-white rounded-[40px] mb-4 duration-500 uppercase font-sans`}
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
          <div className="w-full flex justify-center items-center">
            <div className="h-[650px] w-[1600px] relative rounded-3xl overflow-hidden">
              <p className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl z-10 text-white tracking-wider">
                Better Things in a Better Way
              </p>
              <Image src={"/images/banner.webp"} fill alt="" />
            </div>
          </div>
          <Testimonials />
          <Footer />
        </motion.main>
      }
    </>
  );
};

export default Page;
