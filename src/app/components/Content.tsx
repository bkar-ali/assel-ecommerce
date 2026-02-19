import React, { ReactNode } from "react";
import Btn from "./Btn";
import Video from "./Video";
import Marquee from "react-fast-marquee";

// ICONS
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { SiAdobeacrobatreader } from "react-icons/si";
import { FaAirbnb } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiPuma } from "react-icons/si";

// import { FaReact } from "react-icons/fa";
// import { RiTailwindCssFill } from "react-icons/ri";
// import { SiNextdotjs } from "react-icons/si";
// import { SiTypescript } from "react-icons/si";
import { SiNewbalance } from "react-icons/si";

// import { FaApple } from "react-icons/fa"; // Imported
import { FaChrome } from "react-icons/fa";
import { FaFigma } from "react-icons/fa";
import { RiGooglePlayFill } from "react-icons/ri";
// import ToggleTheme from "./ToggleTheme";

interface iconsItems {
  id: string;
  icon: ReactNode;
}

const iconsArr: iconsItems[] = [
  { id: "apple", icon: <FaApple /> },
  { id: "google", icon: <FaGoogle /> },
  { id: "adobe", icon: <SiAdobeacrobatreader /> },
  { id: "airbnb", icon: <FaAirbnb /> },
  { id: "nike", icon: <SiNike /> },
  { id: "adidas", icon: <SiAdidas /> },
  { id: "puma", icon: <SiPuma /> },
  { id: "nb", icon: <SiNewbalance /> },
];
// const iconsSkill: iconsItems[] = [
//   { id: uuidv4(), icon: <FaReact /> },
//   { id: uuidv4(), icon: <RiTailwindCssFill /> },
//   { id: uuidv4(), icon: <SiNextdotjs /> },
//   { id: uuidv4(), icon: <SiTypescript /> },
// ];

interface featuresDes {
  id: number;
  head: string;
  description: string;
}

const featureInfo: featuresDes[] = [
  {
    id: 0,
    head: "Smart collections",
    description:
      "Organize your saves with intelligent tagging and automatic categorization that adapts to your preferences.",
  },
  {
    id: 1,
    head: "Powerful discovery",
    description:
      "Find exactly what you're looking for with advanced filters, AI-powered recommendations, and search by image.",
  },
  {
    id: 2,
    head: "Community Driven",
    description:
      "Explore trending collections from creatives worldwide and get inspired by what others are saving.",
  },
  {
    id: 3,
    head: "Marketplace",
    description:
      "Jumpstart your projects with 80+ professional templates and assets, ready to download and use.",
  },
  {
    id: 4,
    head: "Course",
    description:
      "Sharpen your eye for design with our visual design foundations course, built to help you elevate your craft.",
  },
  {
    id: 5,
    head: "Easy Sharing",
    description:
      "Save content from any website with our browser extension or mobile app in just one click.",
  },
];

interface platforms {
  id: string;
  icon: ReactNode;
  title: string;
}

const platformsInfo: platforms[] = [
  { id: "apple", icon: <FaApple />, title: "iPhone App" },
  { id: "browse", icon: <FaChrome />, title: "Browser Extension" },
  { id: "figma", icon: <FaFigma />, title: "Figma Plugin" },
  { id: "android", icon: <RiGooglePlayFill />, title: "Android App" },
];
const Content = () => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="title text-textMain text-3xl md:text-4xl text-center mt-5">
        Discover inspiration
        <br /> curated by the best designers.
      </div>
      <div className="title-info text-lg md:text-2xl text-center mt-7 text-gray-400">
        A space to discover new ideas, save what you love
        <br />
        and share them with others.
      </div>
      <div className="text-center mt-8">
        <Btn />
        <Video />
        <div className="text-[#a3a3a3]">
          Trusted by the best design studios and companies
        </div>
        <div id="market" className="hidden md:block w-full my-28 mt-10">
          <Marquee direction="left" speed={35} gradient={false}>
            {iconsArr.map((i) => (
              <div
                key={i.id}
                className="text-[#a3a3a3] text-7xl mx-20 hover:text-blue-600 duration-300"
              >
                {i.icon}
              </div>
            ))}
          </Marquee>
        </div>
        <div id="market" className="md:hidden w-full my-28 mt-10">
          <Marquee direction="left" speed={50}>
            {iconsArr.map((i) => (
              <div
                key={i.id}
                className="text-[#a3a3a3] text-6xl mx-10 hover:text-blue-600 duration-300"
              >
                {i.icon}
              </div>
            ))}
          </Marquee>
        </div>
        {/* Features Section */}
        <div
          className="flex justify-center items-center mb-24 md:mb-44"
          id="whats"
        >
          <div className="max-w-[410px] text-left space-y-5">
            <div className="text-[#a3a3a3] text-base">Why Assel Exists</div>
            <div className=" text-textMain text-3xl font-semibold  ">
              Inspiration deserves better.
              <br />
              <br />
              That’s why we built Assel: no ads, no clutter, only the ideas that
              matter.
              <br />
              <br />
              Together, we’re shaping the best place in the world for Shopping.
            </div>
          </div>
        </div>
        {/* Features 2 Section */}
        <div className="mt-16">
          <div
            className="text-4xl md:text-6xl text-textMain font-semibold text-center"
            id="features"
          >
            Features built to save you time
          </div>
          <div className="text-[#737373] text-sm md:text-base mt-5">
            Explore, save, organize and share. Savee gives you all the
            essentials to refine your taste.
          </div>
          <div className="my-32 w-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {featureInfo.map((f) => (
                <div key={f.id} className="max-w-[300px]">
                  <div className="text-textMain text-3xl mb-3 font-semibold">
                    {f.head}
                  </div>
                  <div className="text-base text-[#737373]">
                    {f.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Platforms Section */}
          <div className="text-textMain text-2xl md:text-base mb-3 mt-8 tracking-wider">
            Available on all your favorite platforms.
          </div>
          <div className="w-full flex justify-center items-center" id="review">
            <div className="bg-[#151515] w-full max-w-[900px] p-6 rounded-2xl border border-[#1e1e1e] text-[#a3a3a3] flex justify-center">
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:justify-evenly">
                {platformsInfo.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center hover:text-blue-600 duration-300 cursor-pointer w-[27vh] md:w-fit"
                  >
                    <div className="text-3xl mr-2">{p.icon}</div>
                    <div className="text-base">{p.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="my-32 w-fit scale-150">
              <Btn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
