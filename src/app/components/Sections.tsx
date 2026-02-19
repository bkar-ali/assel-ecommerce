import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
type Section = {
  id: string;
  img: string;
  category: string;
  slug: string;
};

const newSection: Section[] = [
  {
    id: "womenWatches",
    img: "/sections/womenwatch.jpg",
    category: "Women Watches",
    slug: "womenwatches",
  },
  {
    id: "heels",
    img: "/sections/womenshoes.jpg",
    category: "Heels",
    slug: "heels",
  },
];

const random: Section[] = [
  {
    id: "jewelry",
    img: "/sections/jewelry.jpg",
    category: "Jewelry",
    slug: "jewelry",
  },
  {
    id: "T-shirt",
    img: "/sections/men.jpg",
    category: "T-shirts",
    slug: "men",
  },
  {
    id: "Sneakers",
    img: "/sections/casual.jpg",
    category: "Sneakers",
    slug: "sneakers",
  },
  {
    id: "MenWatches",
    img: "/sections/menwatch.jpg",
    category: "Men Watches",
    slug: "menwatch",
  },
  {
    id: "Dress",
    img: "/sections/women.jpg",
    category: "Dresses",
    slug: "women",
  },
];

const Sections = () => {
  const [randomProduct, setRandomProduct] = useState<Section | null>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * random.length);
    setRandomProduct(random[index]);
  }, []);
  return (
    randomProduct && (
      <div className="mb-5 px-3">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5">
          {
            <Link
              href={`/categores/${randomProduct.slug}`}
              className="w-fit mb-5"
            >
              <div className="relative w-[90vw] md:w-[30vw] h-[70vh] md:h-[100vh] rounded-3xl md:rounded-xl overflow-hidden">
                <Image
                  src={randomProduct.img}
                  fill
                  className="object-cover"
                  alt={randomProduct.category}
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute text-white text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                  {randomProduct.category}
                </div>
                <div className="text-xl w-[60vw] md:w-fit text-center absolute border text-white border-white px-9 py-2 rounded-3xl cursor-pointer bottom-7 left-1/2 -translate-x-1/2 hover:bg-white hover:text-black duration-500 font-semibold ">
                  Shop Now
                </div>
              </div>
            </Link>
          }
          {newSection.map((item) => (
            <Link
              key={item.id}
              href={`/categores/${item.slug}`}
              className="w-fit"
            >
              <div className="relative w-[90vw] md:w-[30vw] h-[80vh] md:h-[100vh] mb-5 md:mb-0 rounded-3xl md:rounded-xl overflow-hidden">
                <Image
                  src={item.img}
                  //   width={200}
                  //    height={600}
                  fill
                  className="object-cover"
                  alt={item.category}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute text-white text-3xl md:text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                  {item.category}
                </div>
                <div className="text-xl w-[60vw] md:w-fit text-center absolute border text-white border-white px-9 py-2 rounded-3xl cursor-pointer bottom-7 left-1/2 -translate-x-1/2 hover:bg-white hover:text-black duration-500 font-semibold ">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default Sections;
