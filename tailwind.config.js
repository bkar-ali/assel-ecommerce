/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Dark Mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "1px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "max-sm": { max: "639px" },
      "max-md": { max: "767px" },
      "max-lg": { max: "1023px" },
    },
    extend: {
      colors: {
        primary: "rgb(var(--primary))",

        textMain: "rgb(var(--text-main))",
        textCard: "rgb(var(--text-card))",
        textHeart: "rgb(var(--text-heart))",
        textPrice: "rgb(var(--text-price))",
        textSale: "rgb(var(--text-sale))",
        textFooter: "rgb(var(--text-footer))",

        bgMain: "rgb(var(--bg-main))",
        bgCard: "rgb(var(--bg-card))",
        bgMegaMenu: "rgb(var(--bg-megaMenu))",
      },
    },
  },
  plugins: [],
};
