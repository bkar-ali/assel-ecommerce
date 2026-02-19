"use client";
import { useEffect } from "react";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/asselHooks";
import { fetchJewelry } from "@/store/asselThunk";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// #1a2334 #a08559

const Testimonials = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.assel.jewelry.data);
  useEffect(() => {
    if (!product.length) {
      dispatch(fetchJewelry());
    }
  }, [dispatch, product.length]);
  const reviews =
    product.length > 2 ? [...product[0].reviews, ...product[2].reviews] : [];
  return (
    <div>
      <div className="h-[50vh] pt-10">
        {/* <h1 className="px-6 pb-5 w-full text-textMain mb-5 font-semibold text-2xl underline underline-offset-8 uppercase duration-500">
          Testimonials
        </h1> */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            320: { slidesPerView: 1.3 }, // موبايلات صغيرة
            480: { slidesPerView: 1.5 }, // موبايلات متوسطة
            640: { slidesPerView: 2 }, // تابلت صغير
            1024: { slidesPerView: 2.5 }, // لابتوب أو ديسكتوب صغير
          }}
          loop={true}
          autoplay
          speed={5000}
          allowTouchMove={true}
          // pagination
          // navigation
          className="flex justify-center items-center gap-8"
        >
          {reviews &&
            reviews.map((c) => (
              <SwiperSlide key={c.reviewerName}>
                <div className=" h-[30vh] p-5 w-[80vw] md:w-full mx-8 bg-bgCard text-textCard  rounded-2xl group duration-500">
                  <h1 className="text-xl md:text-3xl h-[70%] border-b border-black/15 dark:border-white/15 flex items-center justify-between relative">
                    {c.comment}
                    <span className="text-[7rem] md:text-[10rem] font-serif absolute right-0 -top-8 text-[#e0dacf]/40 group-hover:text-[#e0dacf] dark:text-[#a08559]/40 dark:group-hover:text-[#a08559] duration-500">
                      ,,
                    </span>
                  </h1>
                  <div className="py-2 text-xs md:text-base">
                    Name: {c.reviewerName}
                  </div>
                  <div className="text-xs md:text-base">
                    Email: {c.reviewerEmail}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
