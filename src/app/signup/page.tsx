/*
TODO -->  Make Sure All Inputs Not Empty !!
TODO -->  If Empty Show Error Message  !! 

*/
"use client";
// import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { useState } from "react";

// Icons
import { IoChevronBackOutline } from "react-icons/io5";
// import { FaApple } from "react-icons/fa";
// import { FaGoogle } from "react-icons/fa";
// import { MdOutlineEmail } from "react-icons/md";

import { IoPerson } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

// interface icons {
//   id: string;
//   icon: ReactNode;
// }

// const iconsInfo: icons[] = [
//   { id: 1, icon: <FaApple /> },
//   { id: 2, icon: <FaGoogle /> },
//   { id: 3, icon: <MdOutlineEmail /> },
// ];

const Page = () => {
  type FormInput = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    pass: string;
  };
  const [change, setChange] = useState(true);
  const [formInput, setFormInput] = useState<FormInput>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
  });
  // console.log(formInput);
  return (
    <div className="h-screen relative flex-grow flex justify-center items-center flex-col">
      <div className="absolute top-5 left-5">
        <Link href={"/"}>
          <Button
            variant="text"
            className="!text-textMain !py-3 !px-5"
            sx={{ textTransform: "none" }}
          >
            <span className="text-textMain mr-1 text-xl">
              <IoChevronBackOutline />
            </span>
            Back
          </Button>
        </Link>
      </div>
      <div className="text-3xl text-textMain">Assel</div>
      <div className="text-3xl text-textMain mb-8 mt-12 font-semibold flex flex-col">
        {/* Let&apos;s get you inside
        <br /> */}
        create new account
      </div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
        }}
        action=""
        className="p-5 border-2 border-textMain w-[500px] rounded-2xl"
      >
        <div className="relative mb-4 group">
          <input
            type="text"
            name=""
            id=""
            className="bg-[#737373]/20 text-textMain  rounded-lg outline-none p-2 w-full placeholder:text-[#737373]"
            placeholder="User Name"
            value={formInput.username}
            onChange={(e) => {
              setFormInput({ ...formInput, username: e.target.value });
            }}
          />
          <IoPerson className="text-[#777] absolute top-1/2 right-3 -translate-y-1/2 group-focus-within:text-textMain duration-500" />
        </div>

        <div className="w-full flex ">
          <div className="relative w-[49%] mr-2 group">
            <input
              type="text"
              name=""
              id=""
              className="bg-[#737373]/20 text-textMain   rounded-lg outline-none p-2 w-full placeholder:text-[#737373]"
              placeholder="First Name"
              value={formInput.firstName}
              onChange={(e) => {
                setFormInput({ ...formInput, firstName: e.target.value });
              }}
            />
            <FaIdCard className="text-[#777] absolute top-1/2 right-3 -translate-y-1/2 group-focus-within:text-textMain duration-500" />
          </div>
          <div className="relative w-1/2 group">
            <input
              type="text"
              name=""
              id=""
              className="bg-[#737373]/20 text-textMain rounded-lg outline-none p-2 w-full placeholder:text-[#737373]"
              placeholder="Last Name"
              value={formInput.lastName}
              onChange={(e) => {
                setFormInput({ ...formInput, lastName: e.target.value });
              }}
            />
            <FaIdCard className="text-[#777] absolute top-1/2 right-3 -translate-y-1/2 group-focus-within:text-textMain duration-500" />
          </div>
        </div>
        <div className="relative mb-4 w-full mt-4 group">
          <input
            type="text"
            name=""
            id=""
            className="bg-[#737373]/20 text-textMain  rounded-lg outline-none p-2 w-full placeholder:text-[#737373] "
            placeholder="Email"
            value={formInput.email}
            onChange={(e) => {
              setFormInput({ ...formInput, email: e.target.value });
            }}
          />
          <MdEmail className="text-[#777] absolute top-1/2 right-3 -translate-y-1/2 group-focus-within:text-textMain duration-500" />
        </div>
        <div className="relative mb-4 w-full mt-4 group">
          <input
            type={change ? "password" : "text"}
            name=""
            id=""
            className="bg-[#737373]/20 text-textMain  rounded-lg outline-none p-2 w-full placeholder:text-[#737373] "
            placeholder="Password"
            value={formInput.pass}
            onChange={(e) => {
              setFormInput({ ...formInput, pass: e.target.value });
            }}
          />
          {change ? (
            <IoEye
              className="text-[#777] absolute top-1/2 right-3 -translate-y-1/2 group-focus-within:text-textMain duration-500 cursor-pointer"
              onClick={() => {
                setChange(false);
              }}
            />
          ) : (
            <IoMdEyeOff
              className="text-[#777] absolute top-1/2 right-3 -translate-y-1/2 group-focus-within:text-textMain duration-500 cursor-pointer"
              onClick={() => {
                setChange(true);
              }}
            />
          )}
        </div>
      </form>

      {/* //TODO !!!!!!!! */}
      <Link href={"/mainStore"}>
        <button
          className="mt-5 py-3 px-8 bg-[#1500ff] text-white rounded-2xl hover:scale-105 duration-300"
          onClick={(): void => {
            console.log(formInput);

            setFormInput({
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              pass: "",
            });
          }}
        >
          Create Account
        </button>
      </Link>

      {/* <div className="text-base text-[#a3a3a3] mt-8 mb-6">
        Or <br />
        choose how you want to sign up.
        </div> */}
      <div className="flex my-5"></div>
      <div className="text-base text-[#a3a3a3] mt-8">
        already have account,{" "}
        <Link href="/login">
          <span className="text-blue-400 cursor-pointer underline">login</span>.
        </Link>
      </div>
      <div className=" absolute bottom-5 text-[14px] text-[#a3a3a3]/80 mt-12">
        By continuing, you agree to our{" "}
        <span className="!text-textMain">Terms</span> and{" "}
        <span className="!text-textMain">Privacy Policy</span>.
      </div>
    </div>
  );
};

export default Page;
