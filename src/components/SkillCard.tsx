"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface SkillCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const SkillCard = ({ name, description, icon: Icon }: SkillCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.15, 
        ease: "easeOut",
        layout: { duration: 0.25 }
      }}
      whileHover={{ 
        scale: 1.01,
        scaleX: 1.02,
        scaleY: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ 
        scale: 0.98,
        scaleX: 0.97,
        scaleY: 0.99,
        transition: { type: "spring", stiffness: 350, damping: 25 }
      }}
      className="flex items-center gap-3 p-3 bg-white border border-neutral-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(20%-20px)] xl:w-[calc(16.66%-20px)] h-[68px]"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-600">
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-0 min-w-0">
        <h4 className="font-noto text-[13px] font-bold text-neutral-700 line-clamp-2">{name}</h4>
        <p className="font-noto text-[10px] text-neutral-500 leading-tight line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};
