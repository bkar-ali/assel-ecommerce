"use client";
import React from "react";
import Slider from "../components/Slider";
import StoreNavbar from "../components/StoreNavbar";
// Supports weights 100-900
import "@fontsource-variable/raleway";
import Categories from "../components/Categories";
import Sweaters from "../components/Sweaters";
import Banner from "../components/Banner";
import SliderBanner from "../components/SliderBanner";
import Footer from "../components/Footer";
import AsselLoader from "../components/AsselLoader";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sections from "../components/Sections";
import Cart from "../components/Cart";
import Testimonials from "../components/Testimonials";
const PageMain = () => {
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setMounted(true);

    const isFirst = sessionStorage.getItem("visited");
    if (!isFirst) {
      setShowLoader(false);
      sessionStorage.setItem("visited", "true");
    } else {
      setShowLoader(true);
      const timer = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // useEffect(() => {
  //   if (!mounted) return;
  //   setTimeout(() => setShowLoader(false), 2000);
  // }, [mounted]);

  // await new Promise<void>((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 500);
  // });

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {showLoader && <AsselLoader key={"loader"} />}
      </AnimatePresence>

      {!showLoader && (
        <motion.main
          key={"content"}
          initial={{ opacity: 0, y: 180 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="h-[200vh]">
            <StoreNavbar />
            <Cart />
            <Slider />
            <Categories />
            <Sweaters />
            <Banner />
            <SliderBanner />
            <Sections />
            <Testimonials />
            <Footer />
          </div>
        </motion.main>
      )}
    </>
  );
};

export default PageMain;
