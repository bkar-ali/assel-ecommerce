"use client";
import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/app/wishlist/PageComponent"), {
  ssr: false,
});

export default Page;
