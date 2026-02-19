"use client";
// JSON.stringify → تحويل Array/Object إلى String للحفظ

// JSON.parse → تحويل String إلى Array/Object للقراءة
// #1a2334 #a08559
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/asselHooks";
import {
  fetchMen,
  fetchJewelry,
  fetchWatches,
  fetchWomen,
  fetchHeels,
  fetchWomenWatches,
  fetchSneakers,
} from "@/store/asselThunk";
import { useEffect, useState } from "react";
import Image from "next/image";
import StoreNavbar from "@/app/components/StoreNavbar";
import { categoryThunkType, CategoryKey, Product } from "@/store/asselTypes";
import Link from "next/link";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import {
  addToWishlist,
  removeFromWishLis,
  // setWishlist,
} from "@/store/wishlistSlice";
import Cart from "@/app/components/Cart";
import Testimonials from "@/app/components/Testimonials";
import Footer from "@/app/components/Footer";
import { IoBagOutline } from "react-icons/io5";
import { openCart } from "@/store/cartStateSlice";
import { addToCart } from "@/store/cartSlice";
import { IoMdClose } from "react-icons/io";
import { useMemo } from "react";
import UseLockBodyScroll from "@/app/hooks/UseLockBodyScroll";

const categoryThunk: Record<CategoryKey, categoryThunkType> = {
  men: fetchMen,
  jewelry: fetchJewelry,
  women: fetchWomen,
  watches: fetchWatches,
  sneakers: fetchSneakers,
  heels: fetchHeels,
  womenwatches: fetchWomenWatches,
};

const Page = () => {
  const fitsNum = useMemo(() => {
    const arr = [];
    for (let i = 5; i <= 11; i += 0.5) arr.push(i);
    return arr;
  }, []);
  const [sizePage, setSizePage] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<Product>();

  const { category } = useParams();
  const dispatch = useAppDispatch();
  const assel = useAppSelector((state) => state.assel);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      dispatch(removeFromWishLis(product.id));
    } else {
      if (!category || Array.isArray(category)) return;
      dispatch(addToWishlist({ ...product, link: category }));
    }
  };

  // const arr = ["Men", "Jewelry", "Sport", "Women", "Watche", "Casual"];
  // type categoryThunkType = AsyncThunk<Product[], void, { rejectValue: string }>;
  // type CategoryKey = "men" | "jewelry" | "women" | "watches" | "casual";
  // const categoryThunk: Record<CategoryKey, categoryThunkType> = {
  //   men: fetchMen,
  //   jewelry: fetchJewelry,
  //   women: fetchWomen,
  //   watches: fetchWatches,
  //   casual: fetchCasual,
  //   womenshoes: fetchHeels,
  //   womenwatches: fetchWomenWatches,
  // };
  const [price, setPrice] = useState<number[]>([0, 15000]);

  // const [favorites, setFavorites] = useState<number[]>([]);
  // const toggleFav = (id: number) => {
  //   setFavorites((prev) => {
  //     const update = prev.includes(id)
  //       ? prev.filter((itemId) => itemId !== id)
  //       : [...prev, id];
  //     localStorage.setItem("favorites", JSON.stringify(update));
  //     return update;
  //   });
  // };
  // const [showLoader, setShowLoader] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => setShowLoader(false), 2000);
  // }, []);

  // Call Category & Fetch Data
  useEffect(() => {
    if (!category || Array.isArray(category)) return;
    const thunk = categoryThunk[category as CategoryKey];
    if (!thunk) {
      console.error("Invalid category:", category);
      return;
    }

    if (thunk) dispatch(thunk());
  }, [category, dispatch]);
  //Vars
  const categoryData = assel[category as keyof typeof assel];
  const product = categoryData.data;
  // Resete Slider To Each Category
  useEffect(() => {
    if (categoryData.data.length > 0) {
      const pricesArr = product.map((p) => Math.floor(p.price));
      setPrice([Math.min(...pricesArr), Math.max(...pricesArr) + 1]);
    }
  }, [product, categoryData.data.length]);

  UseLockBodyScroll(sizePage);

  // useEffect(() => {
  //   const favs = localStorage.getItem("favorites");
  // if (favs) {
  // setFavorites(JSON.parse(favs));
  // }
  // }, []);

  // Slider Price
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = product.map((p) => Math.floor(p.price));
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices) + 1,
    };
  }, [product]);

  // Filtered Products
  const productFilter = useMemo(() => {
    return product.filter((p) => p.price >= price[0] && p.price <= price[1]);
  }, [product, price]);

  // Safety
  if (!categoryData) {
    return <div className="text-red-500">Invalid Category</div>;
  }
  if (!category || Array.isArray(category))
    return <div className="bg-red-950 text-teal-100 p-3">Invalid Category</div>;
  if (categoryData.loading) {
    return <div className="text-white">Loading...</div>;
  }
  if (categoryData.error) {
    return <div className="text-red-500">{categoryData.error}</div>;
  }

  if (product.length === 0) {
    return <div className="text-white">Loading Products...</div>;
  }
  //Safety

  const handelAddTocart = (id: number, size: number) => {
    const p = product.find((item) => item.id === +id);
    if (!product || !p || !size) return;
    const productWithSize = { ...p, size: size, link: category };
    dispatch(openCart());
    dispatch(addToCart(productWithSize));
  };

  return (
    <>
      {
        <motion.main
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="px-2 md:px-14"
        >
          <Cart />
          <StoreNavbar />

          <div>
            <div className="w-full flex justify-center items-center flex-col mb-5">
              <h1 className="text-textMain pt-32 uppercase text-2xl mb-3">
                {product[0].category}
              </h1>
              <p className="text-textMain opacity-70 tracking-wide text-center">{`supportive, and wildly comfortable, our premium ${product[0].category} make any outing feel effortless.`}</p>
            </div>
            <div className="flex justify-between items-center bg-[#e0dacf] dark:bg-[#1a2334] text-textMain w-full mb-5 h-[8vh] rounded-[30px] px-5 text-sm md:text-xl font-sans duration-300">
              {`Products ( ${productFilter.length} ) `}
              <div className="mr-5 flex">
                <div className="font-sans mr-5 flex items-center justify-center">
                  {price[0]}
                </div>
                <div className="flex justify-center items-center font-sans">
                  <Box
                    sx={{
                      width: {
                        xs: 100, // موبايل
                        sm: 300, // تابلت
                        md: 350, // لابتوب
                        lg: 400, // شاشات كبيرة
                      },
                    }}
                  >
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={price}
                      onChangeCommitted={(e, v) => {
                        if (Array.isArray(v)) {
                          setPrice(v);
                        }
                      }}
                      valueLabelDisplay="auto"
                      aria-label="Default"
                      min={minPrice}
                      max={maxPrice}
                      sx={{
                        color: "#a08559", // اللون الأساسي
                        height: 4, // سمك الخط

                        "& .MuiSlider-thumb": {
                          width: 14,
                          height: 14,
                          backgroundColor: "#a08559",
                          transition: "0.3s",
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: "none",
                          },
                        },

                        "& .MuiSlider-track": {
                          backgroundColor: "#a08559",
                          top: "50%",
                          transform: "translateY(-50%)",
                        },

                        "& .MuiSlider-rail": {
                          opacity: 0.3,
                        },
                      }}
                    />
                  </Box>
                </div>
                <div className="ml-5 font-sans flex items-center justify-center">
                  {price[1]}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
              {productFilter.map((item) => (
                <div
                  key={item.id}
                  className="group lg:hover:scale-105 lg:hover:z-50 lg:hover:shadow-2xl lg:hover:shadow-black lg:dark:hover:shadow-lg lg:dark:hover:shadow-[#a0855989] bg-bgCard p-5 w-full min-h-[50vh] md:min-h-[52vh] flex flex-col rounded-xl relative duration-300"
                >
                  <h2 className="duration-300 text-base bg[#e0dacf] bg-bgMain text-black absolute top-3 left-3 w-[80px] font-medium rounded-3xl flex justify-center items-center font-sans">
                    {`${Math.floor(item.discountPercentage)}% OFF`}
                  </h2>
                  <h2
                    // onClick={() => toggleFav(item.id)}
                    onClick={() => toggleWishlist(item)}
                    className=" cursor-pointer text-xl text-textHeart absolute top-3 -right-1 w-[80px] font-medium rounded-3xl flex justify-center items-center font-sans"
                  >
                    {wishlist.find((p) => p.id === item.id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </h2>
                  <Link href={`/categores/${category}/product/${item.id}`}>
                    <div className="w-full flex justify-center items-center mb-9 mt-4">
                      <Image
                        src={item.images[0]}
                        width={200}
                        height={200}
                        alt={item.description}
                        loading="lazy"
                      ></Image>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-textMain px-1 h-[18vh] md:h-[13vh]">
                        <div className="mb-2 text-textCard text-sm md:text-base">
                          {item.brand}
                        </div>
                        <div className="text-sm md:text-base">{item.title}</div>
                        <div className="font-sans text-textPrice my-2 ">
                          ${Math.floor(item.price)}
                          <span className="line-through ml-2 text-textSale opacity-70">
                            $
                            {Math.floor(
                              item.price -
                                item.price * (item.discountPercentage / 100),
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col lg:flex-row gap-1 md:gap-4">
                    <Link
                      href={`/categores/${category}/product/${item.id}`}
                      className="mb-2 text-sm md:text-base bg-bgMain text-black font-medium w-full px-3 py-1 md:py-2 rounded-xl mt-2 md:hover:scale-105 duration-300 flex justify-center items-center"
                    >
                      <button>Explore More</button>
                    </Link>
                    <button
                      className="lg:hidden text-sm bg-bgMain text-black font-medium w-full px-3 py-1 md:py-2 rounded-xl mt-2 md:hover:scale-105 duration-300 flex justify-center items-center"
                      onClick={() => {
                        setActiveProduct(item);
                        setSizePage(true);
                      }}
                    >
                      <IoBagOutline className="mr-1" />
                      Add To Cart
                    </button>
                  </div>
                  <div
                    className={`w-full min-h-[25vh] p-5 absolute top-[95%] left-0 z-50 hidden lg:group-hover:block group-hover:shadow-2xl group-hover:shadow-[#00000074] dark:group-hover:shadow-lg dark:group-hover:shadow-[#a0855989]/20 duration-300 bg-bgCard rounded-xl`}
                  >
                    <div className="grid grid-cols-4 gap-2 justify-items-center">
                      {fitsNum.map((num, index) => (
                        <div key={index} className="font-sans">
                          <div
                            // onMouseEnter={() => setSize(num)}
                            onClick={() => {
                              handelAddTocart(item.id, num);
                            }}
                            className={`cursor-pointer duration-300 ${"text-textMain border border-gray-500 dark:border-[#a08559] hover:bg-gray-300 dark:hover:bg-[#a08559]/70"} duration-500 flex items-center justify-center w-14 h-10`}
                          >
                            {num}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {sizePage && activeProduct && (
                <div
                  className="fixed bg-black/40 inset-0 z-[9999] flex justify-center items-center"
                  onClick={() => {
                    setSizePage(false);
                  }}
                >
                  <div
                    className="bg-bgCard w-[50vh] h-[50vh] md:h-[45vh] rounded-xl p-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div>Select a Size</div>
                      <div
                        onClick={() => setSizePage(false)}
                        className="cursor-pointer md:text-xl"
                      >
                        <IoMdClose />
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="text-center md:text-xl">
                        {activeProduct?.title}
                      </div>
                      <div className="relative">
                        <Image
                          src={activeProduct.images[0]}
                          width={70}
                          height={70}
                          alt=""
                          className="md:w-[90px] md:h-[90px]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-x-1 md:gap-x-3 md:gap-y-4 gap-y-2 justify-items-center items-center w-full h-[50%] mt-3">
                      {fitsNum.map((num, index) => (
                        <div key={index} className="font-sans">
                          <div
                            // onMouseEnter={() => setSize(num)}
                            onClick={() => {
                              handelAddTocart(activeProduct.id, num);
                              setSizePage(false);
                            }}
                            className={`cursor-pointer duration-300 ${"text-textMain border border-gray-500 dark:border-[#a08559] hover:bg-gray-300 dark:hover:bg-[#a08559]/70"} duration-500 flex items-center justify-center w-14 h-10`}
                          >
                            {num}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.main>
      }

      <Testimonials />
      <Footer />
    </>
  );
};

export default Page;
