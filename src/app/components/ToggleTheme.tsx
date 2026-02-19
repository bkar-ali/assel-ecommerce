"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
// import { CiLight } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { Tooltip } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const ToggleTheme = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="text-[20px] md:text-[19px] flex justify-center items-center">
      <Tooltip
        title={currentTheme}
        slots={{ transition: Zoom }}
        leaveDelay={200}
        placement="top"
        arrow
      >
        <button
          onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
        >
          {currentTheme === "light" ? (
            <IoSunnyOutline className="" />
          ) : (
            <CiDark className="" />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default ToggleTheme;
