"use client";
import React from "react";
import { motion } from "framer-motion";

const AsselLoader = () => {
  // const [showLoader, setShowLoader] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => setShowLoader(false), 4500);
  // }, []);
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[#ece9e2] dark:bg-black z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <motion.h1
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -300 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
        // layoutId="assel-logo"
        className="text-5xl font-semibold text-black dark:text-white"
      >
        Assel
      </motion.h1>
    </motion.div>

    // <AnimatePresence>
    //   <motion.div
    //     className="fixed inset-0 flex items-center justify-center bg-black z-[100]"
    //     initial={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     transition={{ duration: 1.4, ease: "easeInOut" }}
    //   >
    //     <motion.h1
    //       initial={{ scale: 1, y: 0 }}
    //       exit={{ scale: 0.55, y: -200 }}
    //       transition={{ duration: 4.4, ease: "easeInOut" }}
    //       className="text-5xl font-semibold text-white"
    //     >
    //       Assel
    //     </motion.h1>
    //   </motion.div>
    // </AnimatePresence>
  );
};

export default AsselLoader;
