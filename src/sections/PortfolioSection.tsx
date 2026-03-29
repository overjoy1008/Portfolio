"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "../components/Section";
import { Slider } from "../components/Slider";
import { ProjectCard } from "../components/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import { portfolioProjects } from "../data/portfolioData";

const categoryMap: Record<string, { ENG: string; KOR: string }> = {
  All: { ENG: "All", KOR: "전체" },
  Web: { ENG: "Web", KOR: "웹" },
  LLM: { ENG: "LLM", KOR: "LLM" },
  "AI Research": { ENG: "AI Research", KOR: "AI 연구" },
  VR: { ENG: "VR", KOR: "VR" },
};

const internalCategories = ["All", "Web", "LLM", "AI Research", "VR"];

export const PortfolioSection = ({ id }: { id?: string }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => 
    internalCategories.map(cat => categoryMap[cat][language]),
    [language]
  );

  const displayToInternal = useMemo(() => {
    const map: Record<string, string> = {};
    internalCategories.forEach(cat => {
      map[categoryMap[cat][language]] = cat;
    });
    return map;
  }, [language]);

  const filteredProjects = selectedCategory === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.tags.includes(selectedCategory));

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-8">
        <h3 className="font-noto text-4xl md:text-5xl font-black text-neutral-700 text-left tracking-tighter">
          Portfolio.
        </h3>
        
        <Slider 
          categories={categories} 
          selectedCategory={categoryMap[selectedCategory][language]} 
          onSelectCategory={(displayCat) => setSelectedCategory(displayToInternal[displayCat])} 
          layoutId="portfolio-active-pill"
        />

        <div className="flex flex-wrap gap-6 justify-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};
