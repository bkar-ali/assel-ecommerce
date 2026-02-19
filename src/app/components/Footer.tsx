"use client";
import Link from "next/link";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { useState } from "react";
import { GrSubtract } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";

const footerLinks = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "#home" },
      { label: "Sweaters", href: "#sweater" },
      { label: "Wish List", href: "/wishlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Store", href: "/#" },
      { label: "About", href: "/#" },
      { label: "ReRun", href: "/#" },
    ],
  },
  {
    title: "Women Categories",
    links: [
      { label: "Jewelry", href: "/categores/jewelry" },
      { label: "Dress", href: "/categores/women" },
      { label: "Watches", href: "/categores/womenwatches" },
      { label: "Heels", href: "/categores/heels" },
    ],
  },
  {
    title: "Men Categories",
    links: [
      { label: "T-shirt", href: "/categores/men" },
      { label: "Watches", href: "/categores/watches" },
      { label: "Shoes", href: "/categores/sneakers" },
    ],
  },
];

const socialLinks = [
  { id: "facebook", icon: TiSocialFacebook, href: "#" },
  { id: "instgram", icon: FaInstagram, href: "#" },
  { id: "email", icon: MdEmail, href: "mailto:test@email.com" },
  { id: "twitter", icon: FaTwitter, href: "#" },
  { id: "linkedin", icon: FaLinkedin, href: "#" },
  { id: "git", icon: FaGithub, href: "#" },
];

const Footer = () => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <footer className="bg-[#212121] text-textFooter dark:bg-[#1a2334] p-5 min-h-[35vh]">
      {/* Top */}
      <div className="flex flex-col md:flex-row md:justify-between md:border-b dark:border-[#a08559]/40 border-white/20 pb-5  md:pb-10 pt-5 duration-300">
        <div className="w-full md:w-fit text-center md:text-left mb-5">
          <Link href="/">
            <h2 className="font-bold text-xl tracking-wider">Assel</h2>
          </Link>
          <span className="text-xs md:text-base tracking-widest">
            Winter Is Coming
          </span>
        </div>

        {footerLinks.map((section) => (
          <div
            key={section.title}
            className={`border-b dark:border-[#a08559]/40 border-white/20 md:border-none`}
          >
            <div
              className={`flex justify-between items-center py-5`}
              onClick={() =>
                setOpen((prev) =>
                  section.title === prev ? null : section.title,
                )
              }
            >
              <h4 className="font-semibold duration-300 cursor-pointer md:cursor-auto">
                {section.title}
              </h4>
              <div className="md:hidden">
                {open === section.title ? <GrSubtract /> : <FaPlus />}
              </div>
            </div>
            {/* Accordion */}
            <ul>
              {section.links.map((link) => (
                <li
                  key={link.label}
                  className={`mb-3 ${open === section.title ? "block" : "hidden"} md:block text-sm`}
                >
                  <Link
                    href={link.href}
                    className="dark:hover:text-[#a08559]/70 duration-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center mt-5">
        <div className="md:hidden uppercase w-full text-center mb-5 tracking-wider text-sm font-semibold">
          follow the flock
        </div>
        <ul className="flex gap-x-2 mb-2">
          {socialLinks.map(({ icon: Icon, href, id }) => (
            <li
              key={id}
              className="group border rounded-full p-2 border-white dark:border-[#a08559]
                         hover:bg-white dark:hover:bg-[#a08559]"
            >
              <Link href={href}>
                <Icon className="text-xl group-hover:text-black dark:group-hover:text-[#1a2334] duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs mt-4 group duration-300 tracking-wider">
          Made & Designed By{" "}
          <span className="group-hover:text-emerald-600 duration-300">
            Aboubakr
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
