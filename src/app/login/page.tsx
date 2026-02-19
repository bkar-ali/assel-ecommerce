import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Button } from "@mui/material";
// Icons
import { IoChevronBackOutline } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

interface icons {
  id: string;
  icon: ReactNode;
}

const iconsInfo: icons[] = [
  { id: uuidv4(), icon: <FaApple /> },
  { id: uuidv4(), icon: <FaGoogle /> },
  { id: uuidv4(), icon: <MdOutlineEmail /> },
];

const Page = async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
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
      <div className="text-3xl text-textMain mb-8 mt-24 font-semibold">
        Let&apos;s get you inside
      </div>
      <div className="text-base text-[#a3a3a3] mt-8 mb-6">
        Choose how you want to log in.
      </div>
      <div className="flex my-5">
        {iconsInfo.map((i) => (
          <Link key={i.id} href={"/mainStore"}>
            <div className="cursor-pointer w-[80px] h-[80px] rounded-full border-2 border-[#737373]/40 flex justify-center items-center text-textMain text-xl hover:bg-[#2f2f2f] hover:text-white duration-300 m-2">
              {i.icon}
            </div>
          </Link>
        ))}
      </div>
      <div className="text-base text-[#a3a3a3] mt-8">
        Don&apos;t have account?{" "}
        <Link href="/signup">
          <span className="text-blue-400 cursor-pointer underline">Join</span>.
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
