"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, Transition, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface SmoothTextRevealProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
  animation?: "fadeIn" | "fadeOut" | "easeIn" | "easeOut";
  gradient?: boolean;
}

export function SmoothTextReveal({
  text,
  className,
  direction = "left",
  animation = "fadeIn",
  gradient = false,
}: SmoothTextRevealProps) {
  const controls = useAnimation();
  const words = text.split(" ");

  useEffect(() => {
    const variants: Variants = {
      fadeIn: { opacity: 1 },
      fadeOut: { opacity: 0 },
      easeIn: {
        opacity: 1,
        x: 0,
        transition: { ease: "easeIn", duration: 0.2 },
      },
      easeOut: {
        opacity: 1,
        x: 0,
        transition: { ease: "easeOut", duration: 0.2 },
      },
    };

    controls.start((i) => ({
      ...variants[animation as keyof Variants],
      transition: { delay: i * 0.1 },
    }));
  }, [controls, animation]);

  return (
    <div className={`text-lg flex flex-wrap justify-center`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={direction === "left" ? index : words.length - index}
          initial={{ opacity: 0 }}
          animate={controls}
          className={cn(`mr-1 ${className}`, {
            "bg-clip-text text-transparent bg-gradient-to-r from-[#b873339c] via-[#c0c0c0] to-[#c0c0c0] ":
              gradient,
          })}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
