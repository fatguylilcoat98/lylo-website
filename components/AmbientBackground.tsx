"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gold-100/70 blur-3xl"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-16 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-sky-200/70 blur-3xl"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-gold-50 blur-3xl"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -15, 10, 0],
          scale: [1, 1.06, 0.95, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
