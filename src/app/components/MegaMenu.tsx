import React from "react";
import { MegaMenuData } from "../data/MegaMenuData";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type props = {
  data: MegaMenuData;
};
const MegaMenu = ({ data }: props) => {
  return (
    <>
      <div className="w-full bg-bgMegaMenu absolute pt-24 pb-5 hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Title */}
            <div className="w-full flex justify-center items-center pb-12">
              <div className="w-[95%] rounded-xl p-2 flex justify-center items-center bg-[#9e978a] dark:bg-[#a08559]">
                {data.title}
              </div>
            </div>
            <div className="flex justify-between px-10">
              {/* Sections */}
              <div className="grid grid-cols-3 gap-10 w-1/2">
                {data.sections.map((section) => (
                  <div key={section.heading}>
                    <h4 className="font-semibold mb-5">{section.heading}</h4>
                    <ul>
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="opacity-70 cursor-pointer w-fit h-fit mb-5 hover:underline"
                        >
                          <Link href={section.links[i]}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Banners */}
              <div className="flex gap-4">
                {data.banners.map((banner, index) => (
                  <div key={index}>
                    <Link
                      href={banner.link}
                      className="relative block w-[15vw] h-[50vh] cursor-pointer overflow-hidden rounded-xl"
                    >
                      <span className="absolute bottom-5 left-5 text-2xl text-white z-[100]">
                        {banner.title}
                      </span>
                      <Image
                        src={banner.image}
                        fill
                        alt=""
                        className="object-cover shad"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t  from-black/50  via-black/10  to-transparent" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default MegaMenu;
