import React from "react";
import { MegaMenuData } from "../data/MegaMenuData";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa6";

type props = {
  data: MegaMenuData;
  onBack: () => void;
};
const MobileMegaMenu = ({ data, onBack }: props) => {
  return (
    <>
      <div className="w-full bg-bgMegaMenu">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.title}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Title */}
            <div className="w-full flex justify-center items-center pb-5">
              <div className="relative w-[95%] rounded-xl p-2 flex justify-center items-center bg-[#9e978a] dark:bg-[#a08559]">
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-3"
                  onClick={onBack}
                >
                  <FaChevronLeft className="text-sm" />
                </div>
                {data.title}
              </div>
            </div>
            <div className="flex flex-col px-3">
              {/* Sections */}
              <div className="grid grid-rows-3 gap-1">
                {data.sections.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2">{section.heading}</h4>
                    <ul>
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="opacity-70 cursor-pointer w-fit h-fit mb-5 hover:underline text-sm"
                        >
                          <Link href={section.links[i]}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Banners */}
            </div>
            <div className="flex flex-col gap-4 pb-5">
              {data.banners.map((banner, index) => (
                <div key={index} className="">
                  <Link
                    href={banner.link}
                    className="relative block min-w-[50vw] h-[30vh] cursor-pointer overflow-hidden rounded-xl"
                  >
                    <span className="absolute bottom-2 left-3 text-sm text-white z-[100]">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default MobileMegaMenu;
