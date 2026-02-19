"use client";
import Link from "next/link";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from "@/store/asselHooks";
import { useState, useEffect } from "react";
import CheckoutSkeleton from "./CheckoutSkeleton";

const Page = () => {
  const getDiscountedPrice = (price: number, discount: number) =>
    Math.round(price - (discount / 100) * price);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };
  const products = useAppSelector((state) => state.cart.items);
  const subtotal = products.reduce(
    (total, item) =>
      total +
      getDiscountedPrice(item.price, item.discountPercentage) * item.quantity,
    0,
  );
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

  return (
    <>
      {loading ? (
        <CheckoutSkeleton />
      ) : (
        <div className="bg-white min-h-screen">
          {/* header */}
          <div className="w-full h-[15vh] border-b border-gray-300 flex justify-center items-center">
            <Link href={"/"} className="text-6xl w-[60%] text-black">
              Assel
            </Link>
          </div>
          {/* Pages */}
          <div className="lg:grid grid-cols-[55%_45%] min-h-screen">
            {/* Right Page Responsive */}
            <div className="lg:hidden bg-[#f0f0f0] border-l border-gray-300 w-full md:p-5 p-3 md:flex justify-center">
              <div className="w-full md:w-[70%] flex flex-col lg:top-28 lg:h-fit">
                <div
                  className={`w-full p-2 ${products.length >= 4 ? "border-b border-black/20" : ""} overflow-y-auto`}
                >
                  {products.map((product, index) => (
                    <div key={index} className="mb-4 w-full bg-red-10">
                      <div className="flex justify-between">
                        <div className="flex">
                          <div className="border-2 border-white w-fit mr-3 relative">
                            <div className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-md text-sm font-sans">
                              {product.quantity}
                            </div>
                            <Image
                              src={product.images[0]}
                              width={70}
                              height={70}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="tracking-wider text-sm text-black">
                              {product.title}
                            </span>
                            <span className="tracking-wider text-xs md:text-base text-black">{`(${product.brand})`}</span>
                            <span className="text-[#777] text-sm font-sans">
                              {product.size}
                            </span>
                          </div>
                        </div>
                        <div className="text-black font-sans text-sm md:text-base">
                          $
                          {getDiscountedPrice(
                            product.price,
                            product.discountPercentage,
                          )}
                          .00
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col mt-10 lg:w-[70%] w-full text-black/80 font-semibold">
                  <div className="flex justify-between">
                    <span className="text-sm md:text-base">Subtotal</span>
                    <span className="text-[#777] font-sans">
                      ${subtotal}.00
                    </span>
                  </div>
                  <div className="flex justify-between text-black/80 mt-3">
                    <span className="text-sm md:text-base">Shipping</span>
                    <span className="text-[#777] font-sans">
                      {subtotal > 75 ? "Free Shipping" : "$25"}
                    </span>
                  </div>
                  <div className="flex justify-between text-black mt-3">
                    <span className="md:text-2xl text-lg">Total</span>
                    <span className="md:text-2xl text-lg font-sans">
                      ${subtotal > 75 ? subtotal : subtotal + 25}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Left Page */}
            <div className="lg:flex lg:p-10 p-5 lg:justify-end flex justify-center">
              <div className="md:w-[70%] w-full">
                <div className="text-textSale flex items-center justify-center">
                  Express Checkout
                </div>
                <ul className="flex justify-center items-center gap-2 lg:px-2 mt-3">
                  {pays.map((item) => (
                    <li
                      key={item.id}
                      className={`w-80 p-4 rounded-lg`}
                      style={{ backgroundColor: item.color }}
                    >
                      <a
                        href="#"
                        className="w-full flex justify-center items-center"
                      >
                        <Image
                          src={item.url}
                          width={75}
                          height={75}
                          alt=""
                          className="lg:w-[90px]"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 border-b border-gray-300 relative">
                  <span className="absolute text-textSale bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-3">
                    OR
                  </span>
                </div>
                {/* Contact */}
                <div className="my-10">
                  <div className="flex justify-between mb-5">
                    <span className="font-semibold text-xl text-black">
                      Contact
                    </span>
                    <span className="underline text-textSale">Sign in</span>
                  </div>
                  <TextField
                    label="Mobile Phone"
                    variant="outlined"
                    className="w-full !mb-5"
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    className="w-full"
                  />
                  <div className="text-textSale flex items-center text-sm pt-1">
                    <Checkbox {...label} size="small" /> Contact me with news
                    and offers
                  </div>
                </div>
                {/* Delivery */}
                <div className="my-10">
                  <div className="mb-5 font-semibold text-xl text-black">
                    Delivery
                  </div>
                  <TextField
                    label="Country/Region"
                    variant="outlined"
                    className="w-full !mb-3"
                  />
                  <div className="w-full flex justify-between gap-4 mb-3">
                    <TextField
                      label="First Name"
                      variant="outlined"
                      className="w-1/2"
                    />
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      className="w-1/2"
                    />
                  </div>
                  <TextField
                    // helperText="(Optional)"
                    placeholder="(optional)"
                    label="Company"
                    variant="outlined"
                    className="w-full !mb-3"
                  />
                  <TextField
                    label="Address"
                    variant="outlined"
                    className="w-full !mb-3"
                  />
                  <TextField
                    label="Apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    variant="outlined"
                    className="w-full !mb-3"
                  />
                  <div className="flex gap-5">
                    <TextField label="City" variant="outlined" className="" />
                    <TextField label="State" variant="outlined" className="" />
                    <TextField
                      label="ZIP code"
                      variant="outlined"
                      className=""
                    />
                  </div>
                  <div className="text-textSale flex items-center text-sm pt-1">
                    <Checkbox {...label} size="small" /> Text me with news and
                    offers
                  </div>
                </div>
                {/* Payment */}
                <div className="my-10">
                  <div className="flex flex-col mb-5">
                    <span className="font-semibold text-xl text-black">
                      Payment
                    </span>
                    <span className="text-textSale opacity-70">
                      All transactions are secure and encrypted.
                    </span>
                  </div>
                  <div className="bg-[#f0f0f0] p-3 rounded-lg">
                    <TextField
                      label="Card Number"
                      variant="outlined"
                      className="w-full bg-white"
                    />
                    <div className="flex gap-5 my-5">
                      <TextField
                        label="Expiration Date"
                        placeholder="(MM / YY)"
                        variant="outlined"
                        className="w-full bg-white"
                      />
                      <TextField
                        label="Security Code"
                        variant="outlined"
                        className="w-full bg-white"
                      />
                    </div>
                    <TextField
                      label="Name"
                      placeholder="Name on card"
                      variant="outlined"
                      className="w-full bg-white"
                    />
                  </div>
                </div>
                <button className="tracking-widest w-full bg-[#212a2f] text-white font-semibold p-5 rounded-lg border-2 border-[#212a2f] hover:bg-white duration-300 hover:text-black">
                  Pay now
                </button>
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
                          <div className="border-2 border-white w-fit mr-3 relative">
                            <div className="absolute -top-2 -right-2 bg-black text-white py-1 px-2 rounded-md text-sm font-sans">
                              {product.quantity}
                            </div>
                            <Image
                              src={product.images[0]}
                              width={70}
                              height={70}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="tracking-wider text-black">
                              {product.title}
                            </span>
                            <span className="tracking-wider text-sm text-black">{`(${product.brand})`}</span>
                            <span className="text-[#777] text-sm font-sans">
                              {product.size}
                            </span>
                          </div>
                        </div>
                        <div className="pr-3 text-black font-sans">
                          $
                          {getDiscountedPrice(
                            product.price,
                            product.discountPercentage,
                          )}
                          .00
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col mt-10 text-black/80 font-semibold">
                  <div className="flex justify-between">
                    <span>
                      Subtotal .{" "}
                      <span className="font-sans">{products.length}</span> items
                    </span>
                    <span className="text-[#777] font-sans">
                      ${subtotal}.00
                    </span>
                  </div>
                  <div className="flex justify-between text-black/80 mt-3">
                    <span>Shipping</span>
                    <span className="text-[#777] font-sans">
                      {subtotal > 75 ? "Free Shipping" : "$25"}
                    </span>
                  </div>
                  <div className="flex justify-between text-black mt-3">
                    <span className="text-2xl">Total</span>
                    <span className="text-2xl font-sans">
                      ${subtotal > 75 ? subtotal : subtotal + 25}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
