import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["MediNexus", "औषधि सेतु"];

export default function TypewriterTitle() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Blinking cursor effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 1000); // Faster blinking for better UX
    return () => clearTimeout(timeout);
  }, [blink]);

  return (
    <div className="min-h-[3rem] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-5 text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#b873339c] via-[#c0c0c0] to-[#c0c0c0] dark:from-[#6e3b0c76] dark:via-[#c0c0c0] dark:to-[#c0c0c0]"
        >
          {words[index].substring(0, subIndex)}
          <span className="cursor">
            {" "}
            {/* Ensures cursor renders correctly */}
            {blink ? "|" : " "}
          </span>
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
