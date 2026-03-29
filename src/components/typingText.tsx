"use client";

import { motion } from "motion/react";

export const TypingText = ({ text, isCompact = false }: { text: string; isCompact?: boolean }) => {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.03 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={`font-noto font-bold text-neutral-700 tracking-tighter pb-2 ${
        isCompact
          ? "text-[clamp(2.6rem,8vw,3.25rem)] md:text-[clamp(4rem,7vw,5rem)] lg:text-[clamp(4.75rem,6.2vw,6.5rem)]"
          : "text-[clamp(2.6rem,8vw,3.25rem)] md:text-[clamp(4rem,7vw,5rem)] lg:text-[clamp(4.75rem,6.2vw,6.5rem)]"
      }`}
    >
      {characters.map((char, index) => (
        <motion.span variants={child} key={index}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};
