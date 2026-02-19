"use client";
import Image from "next/image";
import Link from "next/link";

type Category = {
  id: string;
  title: string;
  hover: string;
  image: string;
  slug: string;
};

const stores: Category[] = [
  {
    id: "men",
    title: "T-shirts",
    hover: "Shop Now",
    image: "/storeimages/men.jpg",
    slug: "men",
  },
  {
    id: "jewelry",
    title: "Jewelry",
    hover: "Shop Now",
    image: "/storeimages/jewelry.jpg",
    slug: "jewelry",
  },
  // {
  //   id: uuidv4(),
  //   title: "Sport",
  //   hover: "Shop Now",
  //   image: "/StroeImages/sport.jpg",
  //   slug: "sport",
  // },
  {
    id: "dress",
    title: "Dresses",
    hover: "Shop Now",
    image: "/storeimages/women.jpg",
    slug: "women",
  },
  {
    id: "menWatches",
    title: "Men Watches",
    hover: "Shop Now",
    image: "/storeimages/watches.jpg",
    slug: "watches",
  },
  {
    id: "sneakers",
    title: "Sneakers",
    hover: "Shop Now",
    image: "/storeimages/casual.jpg",
    slug: "sneakers",
  },
];
//overflow-hidden
const Categories = () => {
  return (
    <div>
      <div className=" w-full h-[90vh] md:h-[55vh] my-5 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-2 p-2">
        {stores.map((store) => (
          //?Over flow Hidden Or Not
          <div
            key={store.id}
            className="relative overflow-hidden group rounded-xl"
          >
            <Image
              src={store.image}
              alt={store.title}
              fill
              className="object-cover rounded-xl group-hover:blur-[2px] group-hover:scale-110 duration-700"

              //   width={700}
              //   height={700}
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold flex justify-center items-center flex-col ">
              <div
                className={`text-base border group-hover:border-transparent border-white px-4 rounded-3xl  backdrop-blur-[2px] group-hover:mb-2 duration-500 cursor-default`}
              >
                {store.title}
              </div>
              <Link href={`/categores/${store.slug}`}>
                <div className="border border-white px-4 rounded-3xl backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-hover:mt-2 duration-700 hover:bg-white hover:text-black hover:cursor-pointer">
                  {store.hover}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
