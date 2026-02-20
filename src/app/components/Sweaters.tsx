"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useState, useRef } from "react";

import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import type { Swiper as swiperType } from "swiper";
import Link from "next/link";

type sweater = {
  id: string;
  url: string;
  image: string;
  title: string;
  description: string;
};

const sweaters: sweater[] = [
  {
    id: "red",
    image: "/Sweaters/darkRed.png",
    url: "/Sweaters/darkRedUrl.jpg",
    title: "Dark Red Sweater",
    description: "Your cozy go-to for staying in or stepping out.",
  },
  {
    id: "gray",
    image: "/Sweaters/grayyy.png",
    url: "/Sweaters/grayUrl.jpg",
    title: "Gray Sweater",
    description: "Your cozy go-to for staying in or stepping out.",
  },
  {
    id: "brown",
    image: "/Sweaters/brown.png",
    url: "/Sweaters/brownUrl.jpeg",
    title: "Brown Sweater",
    description: "Your cozy go-to for staying in or stepping out.",
  },
  // {
  //   id: uuidv4(),
  //   image: "/sweaters/darkBrown.png",
  //   url: "/sweaters/darkBrownUrl.jpeg",
  //   title: "Dark Brown Sweater",
  //   description: "Your cozy go-to for staying in or stepping out.",
  // },
  // {
  //   id: uuidv4(),
  //   image: "/sweaters/black.png",
  //   url: "/sweaters/blackUrl.jpeg",
  //   title: "Black Sweater",
  //   description: "Your cozy go-to for staying in or stepping out.",
  // },
];

const Sweaters = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  //! Pause And Play Button
  const swiperRef = useRef<swiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  //! Pause And Play Button
  const sliderState = () => {
    if (isPlaying) {
      swiperRef.current?.autoplay.stop();
    } else {
      swiperRef.current?.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-[95vh] my-10" id="sweater">
      <div className=" text-white h-full flex justify-center items-center">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop
          className="h-full flex items-center w-full "
          autoplay={
            //! Pause And Play Button
            // isPlaying ? { delay: 2500, disableOnInteraction: false } : false
            { delay: 2700, disableOnInteraction: false }
          }
          // onAutoplayTimeLeft={(_, time, progressRatio) => {
          //   setProgress(progressRatio * 100);
          // }}
          //! Pause And Play Button
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            // setProgress(0);
            //! Pause And Play Button
            // setSliderStartTime(Date.now());
            setActiveIndex(swiper.realIndex);
          }}
        >
          {sweaters.map((info) => (
            <SwiperSlide key={info.id}>
              <div className="flex flex-col md:flex-row justify-center items-center w-full h-full">
                <div className="flex justify-center items-center w-1/2 h-full content-center">
                  <div className="flex flex-col content-center items-center">
                    <p className="font-semibold mt-5 tracking-wider uppercase font-mono mb-3 text-textMain">
                      Cozy Meets CHIC
                    </p>
                    <div className="bg-sky-9000 object-cover w-[400px] h-[400px] overflow-hidden flex justify-center items-center bkar fade-edges">
                      <Image
                        alt={info.title}
                        src={info.image}
                        width={300}
                        height={400}
                        className="bg-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="text-center">
                        <h2 className="text-xl font-semibold mb-5 mt-2 text-textMain">
                          {info.title}
                        </h2>
                        <p className="text-[15px] text-textMain font-[500]">
                          {info.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 my-5 text-textMain">
                        <div className="mr-1 px-5 py-2 border border-black dark:border-white rounded-3xl text-sm text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer duration-500 font-semibold">
                          <Link href={"/categores/men"}>Shop Men</Link>
                        </div>
                        <div className="ml-1 px-5 py-2 border border-black dark:border-white rounded-3xl text-sm text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer duration-500 font-semibold">
                          <Link href={"/categores/women"}>Shop Women</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sec Half */}
                <div className="flex justify-center items-center w-full md:w-1/2 h-full ">
                  <div className="relative rounded-2xl overflow-hidden w-[75%] h-[95%] ">
                    <div className="z-50 flex gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 w-[50%]">
                      {sweaters.map((_, index) => (
                        <div
                          key={index}
                          className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                        >
                          <div
                            className={` bg-white h-full ${
                              index === activeIndex
                                ? `animate-fill ${!isPlaying ? `paused` : ""}`
                                : ""
                            }
                                  `}
                            style={{
                              width: index < activeIndex ? "100%" : "0%",
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <Image
                      //! Pause And Play Button
                      onClick={sliderState}
                      alt={info.title}
                      src={info.url}
                      fill
                      // width={500}
                      // height={500}
                      className="object-cover hidden md:block"
                      loading="lazy"
                    />

                    {
                      //! Pause And Play Button
                      <button
                        className="absolute -bottom-1 p-5 right-3 hidden md:block"
                        //! Pause And Play Button
                        onClick={sliderState}
                      >
                        {isPlaying ? (
                          <FaRegCirclePause className="w-5 h-5" />
                        ) : (
                          <FaRegCirclePlay className="w-5 h-5" />
                        )}
                      </button>
                    }
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Sweaters;
