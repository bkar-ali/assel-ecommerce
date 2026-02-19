import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

// bg-[#1a2334] text-[#a08559]

type ulInfo = {
  id: string;
  title: string;
  anchor: string;
};
const ulData: ulInfo[] = [
  { id: "features", title: "Features", anchor: "#features" },
  { id: "marketplace", title: "Marketplace", anchor: "#market" },
  { id: "whatsNew", title: "What's new", anchor: "#whats" },
  { id: "reviews", title: "Reviews", anchor: "#review" },
];

const Navbar = () => {
  return (
    <div className="py-4">
      <div className="flex flex-row items-center justify-between relative h-full w-full">
        <Link href={"/"}>
          <div className="info text-3xl text-textMain font-semibold">Assel</div>
        </Link>

        <ul className="hidden md:flex lg:flex md:space-x-6 lg:space-x-12 items-center justify-center  h-full">
          {ulData.map((li) => (
            <li
              key={li.id}
              className="text-[#525252] hover:text-blue-600 duration-300 text-[16px] cursor-pointer"
            >
              <a href={li.anchor}>{li.title}</a>
            </li>
          ))}
        </ul>
        <div>
          <ToggleTheme />
        </div>
        {/* <div className="buttons">
          <Stack spacing={2} direction="row">
            <Link href="/login">
              <Button
                className="!rounded-[20px] !px-5 !py-3 !text-textMain"
                variant="text"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className="!rounded-[20px] !px-5 !py-3"
                variant="contained"
                sx={{ backgroundColor: "#fff", color: "#0a0a0a" }}
              >
                Sign up
              </Button>
            </Link>
          </Stack>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
