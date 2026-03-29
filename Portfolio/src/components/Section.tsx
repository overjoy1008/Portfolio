"use client";

import { motion } from "motion/react";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "5xl" | "7xl" | "full";
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = "", 
  maxWidth = "7xl",
  id
}) => {
  const maxWidthClass = maxWidth === "5xl" ? "max-w-5xl" : maxWidth === "7xl" ? "max-w-7xl" : "max-w-full";
  
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full ${maxWidthClass} mx-auto py-16 px-6 border-t border-neutral-100 ${className}`}
    >
      {children}
    </motion.section>
  );
};
