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

/*


TODO - Alert
? npm install sweetalert2


TODO - Light / Dark Mood 
? npm install next-themes


TODO - New Balance Icon
? import { SiNewbalance } from "react-icons/si";


TODO - Swiper
? npm install swiper


TODO - Axios
? npm install axios


TODO - Redux
? npm i redux 


TODO - Ui Universe Loading Page
? npm i styled-components 



TODO - React Icons 
? npm i react-icons



TODO - React Fast Marquee --> content (ِAnimated Bar)
? npm install react-fast-marquee



TODO - framer motion --> Btn
? npm install framer-motion


TODO - cloudinary.com  (Website)
? To Upload Video (CDN) Streaming And To enhance Website Loading
? https://res.cloudinary.com/dvbnmvv40/video/upload/v1760792125/savee_video_lmotaf.mp4
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-auto"
  src="https://res.cloudinary.com/....../yourvideo.mp4"
></video>


TODO - MUI
? npm install @mui/material @emotion/react @emotion/styled


TODO - Tailwind
? npm install -D tailwindcss@3.4.1
? npm install -D tailwindcss postcss autoprefixer
? npx tailwindcss init -p


TODO - UUID 
? npm install uuid
? npm install --save-dev @types/uuid


*/
