import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export const products = [
  {
    title: "Moonbeam",
    thumbnail: "/assets/homepage/1.jpeg",
  },
  {
    title: "Cursor",
    thumbnail: "/assets/homepage/2.jpeg",
  },
  {
    title: "Rogue",
    thumbnail: "/assets/homepage/3.jpeg",
  },
  {
    title: "Editorially",
    thumbnail: "/assets/homepage/4.jpeg",
  },
  {
    title: "Editrix AI",
    thumbnail: "/assets/homepage/5.jpeg",
  },
  {
    title: "Pixel Perfect",
    thumbnail: "/assets/homepage/6.webp",
  },

  {
    title: "Algochurn",
    thumbnail: "/assets/homepage/7.jpeg",
  },
  {
    title: "Aceternity UI",
    thumbnail: "/assets/homepage/8.jpeg",
  },
  {
    title: "Aceternity UI",
    thumbnail: "/assets/homepage/9.webp",
  },
  // {

  //   title: "Tailwind Master Kit",
  //   link: "https://tailwindmasterkit.com",
  //   thumbnail: "",
  // },
  // {
  //   title: "SmartBridge",
  //   link: "https://smartbridgetech.com",
  //   thumbnail: "",
  // },
];

const HeroParallaxHome = () => {
  return <HeroParallax products={products} />;
};

export default HeroParallaxHome;
