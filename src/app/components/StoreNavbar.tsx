"use client";
//TODO Nav Links
import React, { ReactNode } from "react";
// Icons
import { IoBagOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { GoQuestion } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
// import { CiLight } from "react-icons/ci";
// import { CiDark } from "react-icons/ci";
import ToggleTheme from "./ToggleTheme";
import { useState } from "react";
import { GoHeart } from "react-icons/go";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Variants } from "framer-motion";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/asselHooks";
import { openCart } from "@/store/cartStateSlice";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import MegaMenu from "./MegaMenu";
import megaMenuData from "../data/MegaMenuData";
import MobileMegaMenu from "./MobileMegaMenu";
import { useMemo } from "react";
import UseLockBodyScroll from "../hooks/UseLockBodyScroll";

const StoreNavbar = () => {
  const [close, setClose] = useState<boolean>(true);

  //? type MenuKey = keyof typeof megaMenuData;
  // // => "men" | "women" | "sale"

  // const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);

  const [activeMenu, setActiveMenu] = useState<"men" | "women" | "sale" | null>(
    null,
  );

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  type icons = {
    id: string;
    icon: ReactNode;
  };

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const nav: icons[] = [
    {
      id: "wishlist",
      icon: (
        <Link href="/wishlist" className="hidden md:block">
          <Tooltip
            title="Wishlist"
            slots={{ transition: Zoom }}
            leaveDelay={200}
            placement="top"
            arrow
          >
            <GoHeart />
          </Tooltip>
        </Link>
      ),
    },
    {
      id: "profile",
      icon: (
        <Link href={"/signup"} className="hidden md:block">
          <Tooltip
            title="Profile"
            slots={{ transition: Zoom }}
            leaveDelay={200}
            placement="top"
            arrow
          >
            <GoPerson />
          </Tooltip>
        </Link>
      ),
    },
    {
      id: "info",
      icon: (
        <Link href={"/info"} className="hidden md:block">
          <Tooltip
            title="Info"
            slots={{ transition: Zoom }}
            leaveDelay={200}
            placement="top"
            arrow
          >
            <GoQuestion />
          </Tooltip>
        </Link>
      ),
    },
    {
      id: "cart",
      icon: (
        <Tooltip
          title="Cart"
          slots={{ transition: Zoom }}
          leaveDelay={200}
          placement="top"
          arrow
        >
          <div className="relative" onClick={() => dispatch(openCart())}>
            <div className="absolute -bottom-[5px] -right-[6px] text-textMain bg-bgMain rounded-full w-[15px] h-[15px] font-sans text-[12px] flex items-center justify-center">
              {totalItems}
            </div>
            <IoBagOutline />
          </div>
        </Tooltip>
      ),
    },
  ];

  //   const [showLoader, setShowLoader] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => setShowLoader(false), 2200);
  // }, []);
  const [hoverShow, setHoverShow] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  //TODO راجع الكلام ده كويس
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious?.() ?? 0;
    if (latest > prev && latest > 90) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  //? Normal
  const variants: Variants = {
    visible: { y: 0, transition: { duration: 0.15, ease: "easeOut" } },
    hidden: { y: -180, transition: { duration: 0.25, ease: "easeIn" } },
  };

  // //? Fade
  // const variants = {
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: { duration: 0.35, ease: "easeOut" },
  //   },
  //   hidden: {
  //     y: "-110%",
  //     opacity: 0,
  //     transition: { duration: 0.35, ease: "easeIn" },
  //   },
  // };

  const getNavColor = (item: "men" | "women" | "sale" | null) => {
    if (!activeMenu) return "text-textMain";
    return activeMenu === item ? "text-textMain" : "text-textMain opacity-50";
  };

  // useEffect(() => {
  //   const shouldLock = activeMenu !== null || !close;
  //   // document.body.style.overflow = shouldLock ? "hidden" : "visible";
  //   document.documentElement.style.overflow = shouldLock ? "hidden" : "visible";
  // }, [activeMenu, close]);

  UseLockBodyScroll(activeMenu !== null || !close);

  return (
    // <div className="relative flex justify-center items-center">
    <div
      className="fixed top-0 left-0 right-0 h-20 z-[20]"
      onMouseEnter={() => setHoverShow(true)}
      onMouseLeave={() => setHoverShow(false)}
    >
      {/* PC View Mega Menu */}
      <AnimatePresence>
        {activeMenu && (
          <>
            <motion.div
              // key={activeMenu}
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              exit={{ y: -1000 }}
              transition={{ duration: 1.5 }}
              // className="absolute left-1/2 -translate-x-1/2 top-full mt-6 z-50"
              onMouseLeave={() => setActiveMenu(null)}
              className="hidden md:block"
            >
              <MegaMenu data={megaMenuData[activeMenu]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="fixed inset-0 bg-black -z-10 hidden md:block"
              onMouseLeave={() => setActiveMenu(null)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Mobile View Mega Menu */}
      <AnimatePresence>
        {!close && (
          <>
            <motion.div
              initial={{ y: -700 }}
              animate={{ y: 0 }}
              exit={{ y: -700 }}
              transition={{ duration: 1.5 }}
              // className="absolute left-1/2 -translate-x-1/2 top-full mt-6 z-50"
              className="block md:hidden fixed overflow-y-auto w-screen h-screen bg-bgMegaMenu top-0 left-0 pt-24 px-5 touch-pan-y overscroll-contain"
            >
              {activeMenu === null ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                  >
                    <ul className="flex flex-col gap-10 flex-1 justify-start items-start tracking-wider font-semibold">
                      <li
                        className={`relative cursor-pointer duration-300 ${getNavColor(
                          "men",
                        )} flex items-center justify-between w-full`}
                        onClick={() => setActiveMenu("men")}
                      >
                        <div>Men</div>
                        <div>
                          <CiCircleChevRight className="text-2xl" />
                        </div>
                      </li>
                      <li
                        className={`relative cursor-pointer duration-300 ${getNavColor(
                          "women",
                        )} flex items-center justify-between w-full`}
                        onClick={() => setActiveMenu("women")}
                      >
                        <div>Women</div>
                        <div>
                          <CiCircleChevRight className="text-2xl" />
                        </div>
                      </li>
                      <li
                        className={`relative cursor-pointer duration-300 ${getNavColor(
                          "sale",
                        )} flex items-center justify-between w-full`}
                        onClick={() => setActiveMenu("sale")}
                      >
                        <div>Sale</div>
                        <div>
                          <CiCircleChevRight className="text-2xl" />
                        </div>
                      </li>
                    </ul>
                    <div className="bg-bgCard h-[30vh] w-[50vh] rounded-xl p-5 mb-5 flex flex-col gap-2">
                      <Link href={"/wishlist"}>Wishlist</Link>
                      <Link href={"/info"}>Info</Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div>
                  {/* <div onClick={() => setActiveMenu(null)}>Back</div> */}
                  {
                    <MobileMegaMenu
                      data={megaMenuData[activeMenu]}
                      onBack={() => setActiveMenu(null)}
                    />
                  }
                </div>
              )}

              {/* <AnimatePresence>
                {activeMenu && (
                  <>
                  <motion.div
                      // key={activeMenu}
                      initial={{ y: -1000 }}
                      animate={{ y: 0 }}
                      exit={{ y: -1000 }}
                      transition={{ duration: 1.5 }}
                      // className="absolute left-1/2 -translate-x-1/2 top-full mt-6 z-50"
                      className="block md:hidden"
                    >
                      <MegaMenu data={megaMenuData[activeMenu]} />
                    </motion.div>
                  </>
                )}
              </AnimatePresence> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Navbar */}
      <motion.nav
        variants={variants}
        initial="visible"
        animate={
          close
            ? hoverShow
              ? "visible"
              : hidden
                ? "hidden"
                : "visible"
            : "visible"
        }
        className="inset-x-0
    mx-auto w-[95%] p-1 fixed top-6 duration-200 z-20 bg-bgCard rounded-xl flex justify-between items-center"
      >
        {/* <div className="p-2 bg-white dark:bg-slate-950 fixed top-6 z-30 w-[95%] rounded-xl flex justify-between items-center flex-1 "> */}

        <div
          className="block md:hidden w-[30%]"
          onClick={() => {
            setClose((perv) => !perv);
            setActiveMenu(null);
          }}
        >
          <div className="w-fit cursor-pointer">
            {close ? <HiOutlineMenuAlt2 /> : <IoMdClose />}
          </div>
        </div>

        <div className="text-xl font-semibold w-[30%] md:w-[33%] flex justify-center items-center md:justify-start">
          <h1 className="md:pl-5">
            <Link href={"/"}>Assel</Link>
          </h1>
        </div>
        <div className="w-[30%] hidden md:block">
          <ul className="text-[14px] flex gap-10 flex-1 justify-center items-center tracking-wider font-semibold">
            <li
              className={`relative cursor-pointer duration-300 ${getNavColor(
                "men",
              )}`}
              onMouseEnter={() => setActiveMenu("men")}
            >
              <a href="#">Men</a>
            </li>
            <li
              className={`relative cursor-pointer duration-300 ${getNavColor(
                "women",
              )}`}
              onMouseEnter={() => setActiveMenu("women")}
            >
              <a href="#">Women</a>
            </li>
            <li
              className={`relative cursor-pointer duration-300 ${getNavColor(
                "sale",
              )}`}
              onMouseEnter={() => setActiveMenu("sale")}
            >
              <a href="#">Sale</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center min-w-[30%] justify-end mr-3 gap-5 md:mr-10 md:gap-14">
          {/* <div className="flex gap-5 text-sm items-center">
            <ul className="flex gap-8 flex-1 justify-center">
              <li>
                <a href="#">Our Store</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">ReRun</a>
              </li>
            </ul>
          </div> */}

          {nav.map((i) => (
            <div key={i.id} className="text-base md:text-[15px]">
              <div className="cursor-pointer">{i.icon}</div>
            </div>
          ))}
          <ToggleTheme />
        </div>
      </motion.nav>
    </div>
    // </div>
  );
};

export default StoreNavbar;
