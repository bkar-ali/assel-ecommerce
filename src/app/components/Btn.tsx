"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Btn = () => {
  const words: string[] = [
    "Get Inside",
    "Join The Community",
    "Get Inspire",
    "Start Browsing",
  ];
  // const width: number[] = [100, 150, 150, 150];
  const width: number[] = [120, 205, 130, 170];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Link href={"/login"} className="font-semibold">
      <motion.button
        className={`!rounded-3xl !bg-[#1500ff] py-4 px-8 text-white text-center flex justify-center items-center `}
        layout
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: width[index],
          // width: width[index],
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="w-fit"
            key={words[index]}
            layout
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "inline-block" }}
          >
            <span className="inline-block text-[14px] tracking-wider">
              {words[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </Link>
  );
};

export default Btn;

// <motion.div
//   layout
//   transition={{ type: "spring", stiffness: 500, damping: 30 }}
//   style={{ display: "inline-block" }}
// >
//   <Button
//     className="!rounded-xl !bg-[#1500ff] !py-3 !px-6"
//     variant="contained"
//     sx={{
//       textTransform: "none",
//       overflow: "hidden",
//       height: 50,
//       width: "auto", // يسمح للزر بالتوسع حسب طول النص
//     }}
//   >
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={words[index]}
//         layout
//         initial={{ y: 20, opacity: 0 }} // تبدأ من تحت + شفافية 0
//         animate={{ y: 0, opacity: 1 }} // تتحرك للأعلى + تظهر
//         exit={{ y: -20, opacity: 0 }} // تتحرك للأعلى وتختفي
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         style={{ textAlign: "center" }}
//       >
//         {words[index]}
//       </motion.div>
//     </AnimatePresence>
//   </Button>
// </motion.div>
