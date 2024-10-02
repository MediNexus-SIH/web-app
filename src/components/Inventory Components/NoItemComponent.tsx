"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function NoItemComponent() {
  return (
    <div className="w-full  p-4">
      <motion.div
        className="relative w-full overflow-hidden rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Content container */}
        <div className="relative flex flex-col items-center justify-center bg-black bg-opacity-70 p-8 md:p-12 lg:p-16">
          {/* Animated plus icon */}
          <motion.div
            className="mb-6 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-blue-500 rounded-full opacity-75"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.5)",
                  "0 0 0 20px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <div className="relative bg-white rounded-full p-3">
              <Plus className="w-12 h-12 text-blue-500" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to Your Inventory
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your journey begins here. Click the add item above to add new
            content and start customizing your experience.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
