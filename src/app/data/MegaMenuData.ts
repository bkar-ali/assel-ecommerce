export type MegaMenuSection = {
  heading: string;
  items: string[];
  links: string[];
};

export type MegaMenuBanner = {
  title: string;
  image: string;
  link: string;
};

export type MegaMenuData = {
  title: string;
  sections: MegaMenuSection[];
  banners: MegaMenuBanner[];
};

const megaMenuData: Record<"men" | "women" | "sale", MegaMenuData> = {
  men: {
    title: "Men Collection",
    sections: [
      {
        heading: "Clothing",
        items: ["T-shirts"],
        links: ["/categores/men"],
      },
      {
        heading: "Shoes",
        items: ["Sneakers"],
        links: ["/categores/sneakers"],
      },
      {
        heading: "Accessories",
        items: ["Watches"],
        links: ["/categores/watches"],
      },
    ],
    banners: [
      {
        title: "Rolex Collection",
        image: "/MegaMenu/watche.jpg",
        link: "/categores/watches",
      },
      {
        title: "T-shirts Collection",
        image: "/MegaMenu/menClothes.jpg",
        link: "/categores/men",
      },
    ],
  },

  women: {
    title: "Women Collection",
    sections: [
      {
        heading: "Clothing",
        items: ["Dresses"],
        links: ["/categores/women"],
      },
      {
        heading: "Shoes",
        items: ["Heels"],
        links: ["/categores/heels"],
      },
      {
        heading: "Accessories",
        items: ["Watches", "Jewelry"],
        links: ["/categores/womenwatches", "/categores/jewelry"],
      },
    ],
    banners: [
      {
        title: "Jewelry Collection",
        image: "/MegaMenu/jewelry.jpg",
        link: "/categores/jewelry",
      },
      {
        title: "Heels Collection",
        image: "/MegaMenu/heels.jpg",
        link: "/categores/heels",
      },
    ],
  },
  sale: {
    title: "Sale Collection",
    sections: [
      {
        heading: "Clothing",
        items: ["T-shirts", "Dresses"],
        links: ["/categores/men", "/categores/women"],
      },
      {
        heading: "Shoes",
        items: ["Sneakers", "Heels"],
        links: ["/categores/casual", "/categores/heels"],
      },
      {
        heading: "Accessories",
        items: ["Men Watches", "Women Watches", "Jewelry"],
        links: [
          "/categores/watches",
          "/categores/womenwatches",
          "/categores/jewelry",
        ],
      },
    ],
    banners: [
      {
        title: "Men Sale",
        image: "/MegaMenu/menClothes1.jpg",
        link: "/categores/men",
      },
      {
        title: "Sneakers Sale",
        image: "/MegaMenu/casual.jpg",
        link: "/categores/casual",
      },
    ],
  },
};

export default megaMenuData;
