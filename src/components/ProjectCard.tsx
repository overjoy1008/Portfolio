"use client";

import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Project } from "../data/portfolioData";
import { useLanguage } from "../context/LanguageContext";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useLanguage();
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/portfolio/${project.id}`);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(33.33%-16px)] h-[380px]"
    >
      {/* Thumbnail - 4:3 Aspect Ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={project.thumbnail}
          alt={project.title[language]}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay for links */}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <button
                key={idx}
                onClick={(e) => handleLinkClick(e, link.url)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors shadow-sm"
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-noto px-2 py-0.5 bg-neutral-50 text-neutral-500 text-[10px] font-bold uppercase tracking-wider rounded border border-neutral-100"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col gap-1">
          <h4 className="font-noto text-lg font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors">
            {project.title[language]}
          </h4>
          <p className="font-noto text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {project.description[language]}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
