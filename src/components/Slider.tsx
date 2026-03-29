"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface SliderProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  size?: 'sm' | 'md';
  layoutId?: string;
}

export const Slider = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  size = 'md',
  layoutId = "active-pill"
}: SliderProps) => {
  const isSmall = size === 'sm';
  const [useDropdown, setUseDropdown] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      setUseDropdown(window.innerWidth < 440 && categories.length >= 4 && !isSmall);
    };

    updateMode();
    window.addEventListener("resize", updateMode);
    return () => window.removeEventListener("resize", updateMode);
  }, [categories.length, isSmall]);

  if (useDropdown) {
    return (
      <div className="w-full max-w-[220px]">
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full font-noto text-[13px] font-bold text-neutral-700 bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center bg-neutral-400/5 backdrop-blur-2xl border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.02),inset_0_0_0_1px_rgba(255,255,255,0.05)] w-fit overflow-hidden ${
      isSmall ? 'p-1 rounded-full' : 'p-1 rounded-[18px] sm:p-1.5 sm:rounded-[22px]'
    }`}>
      {categories.map((category, index) => (
        <div key={category} className="flex items-center relative">
          <motion.button
            onClick={() => onSelectCategory(category)}
            whileHover="hover"
            whileTap="tap"
            className={`relative font-noto font-bold transition-all duration-500 z-10 outline-none group ${
              isSmall
                ? 'px-4 py-1.5 text-[11px]'
                : 'px-3 py-1.5 text-[11px] sm:px-5 sm:py-2 sm:text-[12px] lg:px-7 lg:py-2.5 lg:text-[14px]'
            }`}
            style={{
              color: selectedCategory === category ? "#1a1a1a" : "#8e8e93",
            }}
          >
            <span className="relative z-20 tracking-tight transition-transform duration-300 group-active:scale-95">
              {category}
            </span>
            
            {selectedCategory === category && (
              <motion.div
                layout="x"
                layoutId={layoutId}
                className={`absolute inset-0 bg-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.04),inset_0_1.5px_0_rgba(255,255,255,1)] z-10 ${
                  isSmall ? 'rounded-full' : 'rounded-[18px]'
                }`}
                variants={{
                  hover: { scaleX: 1.15 },
                  tap: { scaleX: 0.85 }
                }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.6,
                }}
              />
            )}
          </motion.button>
          
          {index < categories.length - 1 && (
            <motion.div 
              animate={{ opacity: selectedCategory === category || selectedCategory === categories[index + 1] ? 0 : 0.3 }}
              className="h-3 w-[0.5px] bg-neutral-400/50 mx-0.5 transition-opacity duration-300" 
            />
          )}
        </div>
      ))}
    </div>
  );
};
