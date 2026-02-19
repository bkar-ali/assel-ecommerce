"use client";
import React from "react";
import { useAppSelector } from "@/store/asselHooks";
import { useState, useEffect } from "react";

type paysType = {
  id: string;
  url: string;
  color: string;
};

const pays: paysType[] = [
  // {
  //   id: uuidv4(),
  //   url: "https://images.ctfassets.net/9uo1qvvet3xa/33RudJxATBd104HGRLDee7/b2c410059d5ba3cdef8fcbd4f8a5803c/Amazon_Pay_-_Black.svg",
  //   color: "#fad676",
  // },
  {
    id: "shop pay",
    url: "https://images.ctfassets.net/9uo1qvvet3xa/6z90ekdLBJdFRPh7vo2wLh/2d4a0a4e96f3d7a19cea75f09cdc59ad/ShopPay_-_White.svg",
    color: "#5a31f4",
  },
  {
    id: "pay pal",
    url: "https://images.ctfassets.net/9uo1qvvet3xa/4dooJgkFpDR0AeMb4MKw8u/954fd7930cbc82523b57ef6e724be215/PayPal_-_Color.svg",
    color: "#ffc439",
  },
];

const CheckoutSkeleton = () => {
  const products = useAppSelector((state) => state.cart.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="min-h-screen">
      <div className="bg-white">
        {/* header */}
        <div className="w-full h-[15vh] border-b border-gray-300 flex justify-center items-center">
          <div className="h-10 w-[60%] flex justify-start">
            <div className="h-12 w-44 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Pages */}
        <div className="lg:grid grid-cols-[55%_45%] min-h-screen">
          {/* Right Page Responsive */}
          <div className="lg:hidden bg-[#f0f0f0] border-l border-gray-300 w-full md:p-5 p-3 md:flex justify-center">
            <div className="w-full md:w-[70%] flex flex-col lg:top-28 lg:h-fit">
              <div
                className={`w-full p-2 border-b border-black/20" overflow-y-auto`}
              >
                {products.map((product) => (
                  <div
                    key={`${product.id} - ${product.size}`}
                    className="mb-4 w-full bg-red-10"
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className=" w-fit mr-3 relative">
                          <div className="h-20 w-20 bg-gray-300 rounded animate-pulse mb-5"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="tracking-wider text-black">
                            <div className="h-20 w-80 bg-gray-300 rounded animate-pulse mb-5"></div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col mt-10 w-[70%] text-black/80 font-semibold">
                <div className="flex justify-between">
                  <span>
                    <div className="h-10 w-20 bg-gray-300 rounded animate-pulse"></div>
                  </span>
                  <span className="text-[#777]">
                    <div className="h-10 w-20 bg-gray-300 rounded animate-pulse"></div>
                  </span>
                </div>
                <div className="flex justify-between text-black/80 mt-3">
                  <div className="h-10 w-16 bg-gray-300 rounded animate-pulse"></div>
                  <span className="text-[#777]">
                    <div className="h-10 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </span>
                </div>
                <div className="flex justify-between text-black mt-3">
                  <span className="text-2xl">
                    <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                  </span>
                  <span className="text-2xl">
                    <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* left Page */}
          <div className="lg:flex lg:p-10 p-5 lg:justify-end flex justify-center">
            <div className="md:w-[70%] w-full">
              <div className="text-textSale flex items-center justify-center">
                <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <ul className="flex gap-2 px-2 mt-3">
                {pays.map((item) => (
                  <li
                    key={`${item.id}`}
                    className={`w-80 p-4 rounded-lg h-14 bg-gray-300 animate-pulse`}
                  >
                    <a
                      href="#"
                      className="w-full flex justify-center items-center"
                    ></a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-b border-gray-300 relative"></div>
              {/* Contact */}
              <div className="my-10">
                <div className="h-14 w-full bg-gray-300 rounded animate-pulse mb-5"></div>
                <div className="h-14 w-full bg-gray-300 rounded animate-pulse mb-5"></div>
              </div>
              {/* Delivery */}
              <div className="my-10">
                <div className="h-14 w-full bg-gray-300 rounded animate-pulse mb-5"></div>

                <div className="w-full flex justify-between gap-4 mb-3">
                  <div className="h-14 w-1/2 bg-gray-300 rounded animate-pulse mb-5"></div>

                  <div className="h-14 w-1/2 bg-gray-300 rounded animate-pulse mb-5"></div>
                </div>

                <div className="w-full flex justify-between gap-4 mb-3">
                  <div className="h-14 w-1/2 bg-gray-300 rounded animate-pulse mb-5"></div>

                  <div className="h-14 w-1/2 bg-gray-300 rounded animate-pulse mb-5"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Page Laptop View */}
          <div className="hidden lg:block bg-[#f0f0f0] border-l border-gray-300 w-full p-10">
            <div className="sticky top-28 h-fit">
              <div
                className={`max-h-[40vh] p-2 ${products.length >= 4 ? "border-b border-black/20" : ""} overflow-y-auto`}
              >
                {products.map((product) => (
                  <div
                    key={`${product.id} - ${product.size}`}
                    className="mb-4 w-full"
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="h-[70px] w-[70px] mr-5 bg-gray-300 rounded animate-pulse"></div>

                        <div className="flex flex-col">
                          <span className="tracking-wider text-black">
                            <div className="h-16 w-80 bg-gray-300 rounded animate-pulse"></div>
                          </span>
                        </div>
                      </div>
                      <div className="pr-3 text-black font-sans"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
