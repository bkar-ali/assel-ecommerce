import React from "react";
import Image from "next/image";
import Link from "next/link";

const banners = ["/Land/soft.jpg"];

const Banner = () => {
  return (
    <div className="w-full h-[300px] relative overflow-hidden">
      <Image
        src={banners[0]}
        alt="Week Sale Banner"
        // width={200}
        // height={200}
        fill
        className="object-cover"
        loading="lazy"
      ></Image>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute flex flex-col justify-center items-center w-full h-full text-white gap-2">
        <div className="mb-5">Friday Week Sale</div>
        <p className="text-2xl md:text-4xl">Up to 50% Off Everything</p>
        <div className="mt-5 text-white font-semibold text-xl border border-white px-6 py-1 rounded-3xl backdrop-blur-[2px] hover:bg-white/90 hover:text-black/80  duration-500">
          <Link href={"/categores/sneakers"}>Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
