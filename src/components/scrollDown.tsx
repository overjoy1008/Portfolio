"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";

export const ScrollDown = () => {
  const { language } = useLanguage();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isAtTop && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="font-noto text-[10px] font-bold text-neutral-300 uppercase tracking-[0.2em] whitespace-nowrap">
            {language === 'ENG' ? "scroll down" : "아래로 스크롤해보세요."}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={16} className="text-neutral-300" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
