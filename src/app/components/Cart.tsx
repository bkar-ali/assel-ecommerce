"use client";
//? #1a2334 #a08559
import { increaseQty, decreaseQty } from "@/store/cartSlice";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/asselHooks";
import { closeCart } from "@/store/cartStateSlice";
import { removeFromCart } from "@/store/cartSlice";
import { Product } from "@/store/asselTypes";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useMemo } from "react";
import UseLockBodyScroll from "../hooks/UseLockBodyScroll";

// type CartProps = {
//   showCart: boolean;
//   setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
// };
// const BodyScroll = (isLocked: boolean) => {
//   useEffect(() => {
//     if (!isLocked) return;
//     const scrollY = window.scrollY;
//     document.body.style.position = "fixed";
//     document.body.style.top = `-${scrollY}px`;
//     document.body.style.left = "0";
//     document.body.style.right = "0";
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.position = "";
//       document.body.style.top = "";
//       document.body.style.left = "";
//       document.body.style.right = "";
//       document.body.style.overflow = "";
//       window.scrollTo(0, scrollY);
//     };
//   }, [isLocked]);
// };
interface paysType {
  id: string;
  url: string;
  color: string;
}
const pays: paysType[] = [
  {
    id: "amazon",
    url: "https://images.ctfassets.net/9uo1qvvet3xa/33RudJxATBd104HGRLDee7/b2c410059d5ba3cdef8fcbd4f8a5803c/Amazon_Pay_-_Black.svg",
    color: "#fad676",
  },
  {
    id: "paypal",
    url: "https://images.ctfassets.net/9uo1qvvet3xa/4dooJgkFpDR0AeMb4MKw8u/954fd7930cbc82523b57ef6e724be215/PayPal_-_Color.svg",
    color: "#ffc439",
  },
  {
    id: "shoppay",
    url: "https://images.ctfassets.net/9uo1qvvet3xa/6z90ekdLBJdFRPh7vo2wLh/2d4a0a4e96f3d7a19cea75f09cdc59ad/ShopPay_-_White.svg",
    color: "#5a31f4",
  },
];

const links = [
  { id: "men", href: "/categores/men", title: "Shop Men T-Shirts" },
  { id: "women", href: "/categores/women", title: "Shop Women Dress" },
  { id: "menWatches", href: "/categores/watches", title: "Shop Men Watches" },
  {
    id: "womenWatches",
    href: "/categores/womenwatches",
    title: "Shop Women Watches",
  },
  { id: "jewelry", href: "/categores/jewelry", title: "Shop Jewelry" },
  { id: "sneakers", href: "/categores/sneakers", title: "Shop Men Sneakers" },
  { id: "heels", href: "/categores/heels", title: "Shop Women Heels" },
];

const Cart = () => {
  const dispatch = useAppDispatch();
  const showCart = useAppSelector((state) => state.showCartState.showCart);
  const products = useAppSelector((state) => state.cart.items);
  // const arr = [];
  // let subtotal = 0;
  // for (let i = 0; i < products.length; i++) {
  //   arr.push(Math.floor(products[i].price * products[i].quantity));
  // }
  // arr.map((n) => (subtotal = subtotal + n));

  const subtotal = useMemo(() => {
    return products.reduce(
      (total, item) =>
        total +
        Math.floor(item.price - item.price * (item.discountPercentage / 100)) *
          item.quantity,
      0,
    );
  }, [products]);

  const totalItems = useMemo(() => {
    return products.reduce((t, i) => t + i.quantity, 0);
  }, [products]);

  // BodyScroll(showCart);
  UseLockBodyScroll(showCart);

  const handelDelete = (product: Product) => {
    dispatch(removeFromCart(product));
  };
  const plusOne = (product: Product) => {
    dispatch(increaseQty({ id: product.id, size: product.size }));
  };
  const subOne = (product: Product) => {
    dispatch(decreaseQty({ id: product.id, size: product.size }));
  };
  return (
    <AnimatePresence>
      {showCart && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[9998]"
            onClick={() => dispatch(closeCart())}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`fixed top-0 right-0 w-screen md:w-[35vw] h-screen z-[9999] bg-bgCard px-3 py-2 overflow-y-auto overscroll-y-contain md:overflow-hidden`}
          >
            <div className="flex justify-between items-center font-sans text-[14px] md:text-[17px] mb-3 text-textMain">
              <div>
                {`
                  Cart ( ${totalItems} )`}
              </div>
              <p className="ml-2 font-semibold">
                {subtotal < 75
                  ? `Spend $${75 - subtotal} more to earn free shipping!`
                  : "You've earned free shipping!"}
              </p>
              <div
                className="cursor-pointer"
                onClick={() => dispatch(closeCart())}
              >
                <IoMdClose className="text-xl md:text-2xl" />
              </div>
            </div>
            <div className="mb-3 bg-[#f1e1c9] w-full h-2 rounded-xl overflow-hidden">
              <div
                className="bg-slate-600 h-2 rounded-xl duration-500"
                style={{ width: `${(subtotal / 75) * 100}%` }}
              ></div>
            </div>
            {products.length <= 0 ? (
              <div className="flex items-center space-y-3 flex-col">
                <div className=" text-textMain text-lg md:text-2xl mt-10 mb-5 font-semibold tracking-wider">
                  Your cart is empty. Start shopping!
                </div>
                {links.map((link) => (
                  <Link
                    href={`${link.href}`}
                    key={link.id}
                    onClick={() => dispatch(closeCart())}
                  >
                    <div className="text-sm md:text-lg tracking-wider bg-black dark:bg-[#a08559] text-white rounded-3xl p-2 w-[60vw] md:w-[25vw] text-center md:hover:scale-110 duration-500 cursor-pointer">
                      {link.title}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <>
                <div className=" text-textMain h-[70%] overflow-y-auto cart-scroll pr-4">
                  {products.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="pb-3 mb-6 border-b border-[#a08559] font-sans flex justify-between"
                    >
                      <div className="flex">
                        <Link
                          href={`/categores/${item.link}/product/${item.id}`}
                        >
                          <Image
                            src={item.images[0]}
                            width={100}
                            height={100}
                            alt=""
                          />
                        </Link>
                        <div className="info flex flex-col space-y-1">
                          <Link
                            href={`/categores/${item.link}/product/${item.id}`}
                          >
                            <div className="font-[400] tracking-wider font-mono">
                              {item.title}
                            </div>
                          </Link>
                          <div className="text-[14px] text-gray-500">
                            Size: {item.size}
                          </div>
                          <div
                            className="underline underline-offset-4 cursor-pointer w-fit text-[14px] text-gray-500"
                            onClick={() => {
                              handelDelete(item);
                            }}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-[100px]">
                        <div className="text-textPrice text-right">
                          $
                          {Math.floor(
                            item.price -
                              item.price * (item.discountPercentage / 100),
                          )}
                          <span className="text-textSale opacity-70 line-through ml-2">
                            ${Math.floor(item.price)}
                          </span>
                        </div>
                        <div className="my-1 text-textPrice text-right text-[14px]">
                          Final Sale
                        </div>
                        <div className="mt-1 w-full border border-black dark:border-[#a08559] rounded-3xl py-1 px-3 text-[14px] flex justify-between items-center">
                          {/* FaPlus RiSubtractFill MdDelete */}
                          <div className="cursor-pointer">
                            {item.quantity <= 1 ? (
                              <MdDelete
                                onClick={() => {
                                  handelDelete(item);
                                }}
                              />
                            ) : (
                              <RiSubtractFill onClick={() => subOne(item)} />
                            )}
                          </div>
                          <div>{item.quantity}</div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              plusOne(item);
                            }}
                          >
                            <FaPlus />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <div className="w-full flex justify-between text-[17px] text-textMain mb-3 px-2 border-t border-[#a08559] pt-2 tracking-wider font-mono">
                    <div>Subtotal</div>
                    <div>${subtotal}</div>
                  </div>
                  <Link href={"/checkout"}>
                    <button className=" font-semibold tracking-widest w-full uppercase rounded-3xl bg-[#212121] dark:bg-[#a08559]/80 dark:hover:bg-[#a08559] py-3 text-white duration-300">
                      checkout
                    </button>
                  </Link>
                  <ul className="flex gap-2 px-2 mt-3">
                    {pays.map((item) => (
                      <li
                        key={item.id}
                        className={`w-1/3 p-3 rounded-3xl`}
                        style={{ backgroundColor: item.color }}
                      >
                        <a
                          href="#"
                          className="w-full flex justify-center items-center"
                        >
                          <Image src={item.url} width={60} height={60} alt="" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
