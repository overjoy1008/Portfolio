"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

export const SocialLink = ({ icon: Icon, label, href, delay, onClick }: { icon: any, label: string, href?: string, delay?: number, onClick?: () => void }) => {
  const [isReady, setIsReady] = useState(false);
  const shouldOpenInNewTab = href?.startsWith("http") || href?.endsWith(".pdf");

  useEffect(() => {
    const waitTime = delay ? (delay + 0.6) * 1000 : 600;
    const timer = setTimeout(() => setIsReady(true), waitTime);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.a
      href={href}
      target={shouldOpenInNewTab ? "_blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (!isReady) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      initial={delay ? { opacity: 0, y: 10 } : false}
      animate={delay ? { opacity: 1, y: 0 } : false}
      transition={delay ? { delay, duration: 0.6, ease: "easeOut" } : {}}
      className={`flex flex-col items-center gap-2 group ${!isReady ? "pointer-events-none" : "cursor-pointer"}`}
    >
      <motion.div 
        className="p-3 rounded-2xl bg-neutral-50 group-hover:bg-neutral-100 transition-colors duration-300"
        whileHover={isReady ? { 
          scale: 1.06,
          scaleX: 1.08,
          scaleY: 1.04,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        } : {}}
        whileTap={isReady ? { 
          scale: 0.94,
          scaleX: 0.92,
          scaleY: 0.96,
          transition: { type: "spring", stiffness: 350, damping: 25 }
        } : {}}
      >
        <Icon size={24} className="text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300" />
      </motion.div>
      <span className="font-noto text-xs font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 uppercase tracking-widest">
        {label}
      </span>
    </motion.a>
  );
};
