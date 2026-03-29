"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, Code, Server, Zap, Globe, Database, 
  Cloud, Cpu, FileCode, Activity, Brain, Search, 
  Gamepad, Github, LucideIcon 
} from "lucide-react";
import { Section } from "../components/Section";
import { Slider } from "../components/Slider";
import { SkillCard } from "../components/SkillCard";
import { useLanguage } from "../context/LanguageContext";

interface Skill {
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

const skills: Skill[] = [
  { name: "Next.js", category: "Frontend", description: "SSR, SSG, App Router", icon: Layers },
  { name: "React", category: "Frontend", description: "Hooks, Context API, Redux", icon: Code },
  { name: "TypeScript", category: "Frontend", description: "Type-safe frontend development", icon: FileCode },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first styling", icon: Layers },
  { name: "Express", category: "Backend", description: "Node.js framework", icon: Server },
  { name: "FastAPI", category: "Backend", description: "Python framework", icon: Zap },
  { name: "RESTful API", category: "Backend", description: "API design", icon: Globe },
  { name: "PostgreSQL", category: "Backend", description: "Relational database", icon: Database },
  { name: "AWS S3", category: "Backend", description: "Object storage", icon: Cloud },
  { name: "AWS EC2", category: "Backend", description: "Cloud computing", icon: Cpu },
  { name: "Python", category: "AI", description: "Main language for AI", icon: FileCode },
  { name: "PyTorch", category: "AI", description: "Deep learning framework", icon: Activity },
  { name: "LLM", category: "AI", description: "Large Language Models", icon: Brain },
  { name: "RAG", category: "AI", description: "Retrieval-Augmented Generation", icon: Search },
  { name: "Milvus", category: "AI", description: "Vector database", icon: Database },
  { name: "Unity", category: "GameEngine", description: "Game engine", icon: Gamepad },
  { name: "C#", category: "GameEngine", description: "Unity scripting and application logic", icon: FileCode },
  { name: "Github", category: "Others", description: "Version control", icon: Github },
];

const categoryMap: Record<string, { ENG: string; KOR: string }> = {
  All: { ENG: "All", KOR: "전체" },
  Frontend: { ENG: "Frontend", KOR: "프론트엔드" },
  Backend: { ENG: "Backend", KOR: "백엔드" },
  AI: { ENG: "AI", KOR: "AI" },
  GameEngine: { ENG: "Game Engine", KOR: "게임 엔진" },
  Others: { ENG: "Others", KOR: "기타" },
};

const internalCategories = ["All", "Frontend", "Backend", "AI", "GameEngine", "Others"];

export const SkillsSection = ({ id }: { id?: string }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1280);

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

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const itemsPerRow =
    windowWidth >= 1280 ? 6 :
    windowWidth >= 1024 ? 5 :
    windowWidth >= 768 ? 3 :
    windowWidth >= 640 ? 2 : 1;

  const rowCount = Math.ceil(filteredSkills.length / itemsPerRow);
  const shouldShowToggle = rowCount >= 4;
  const visibleSkills = shouldShowToggle && !isExpanded
    ? filteredSkills.slice(0, itemsPerRow * 3)
    : filteredSkills;

  useEffect(() => {
    setIsExpanded(false);
  }, [selectedCategory]);

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-8">
        <h3 className="font-noto text-4xl md:text-5xl font-black text-neutral-700 text-left tracking-tighter">
          Skills.
        </h3>
        
        <Slider 
          categories={categories} 
          selectedCategory={categoryMap[selectedCategory][language]} 
          onSelectCategory={(displayCat) => setSelectedCategory(displayToInternal[displayCat])} 
          layoutId="skills-active-pill"
        />

        <div className="flex flex-wrap gap-6 justify-start">
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill) => (
              <SkillCard 
                key={skill.name} 
                name={skill.name} 
                description={skill.description} 
                icon={skill.icon} 
              />
            ))}
          </AnimatePresence>
        </div>

        {shouldShowToggle && (
          <motion.button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-fit px-3 py-1 bg-neutral-50 rounded-lg border border-neutral-100"
            whileHover={{ 
              scale: 1.03,
              scaleX: 1.04,
              scaleY: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            whileTap={{ 
              scale: 0.97,
              scaleX: 0.96,
              scaleY: 0.98,
              transition: { type: "spring", stiffness: 350, damping: 25 }
            }}
          >
            <span className="font-noto text-xs font-bold text-neutral-700 tracking-wider">
              {isExpanded ? (language === "ENG" ? "Show Less" : "접기") : (language === "ENG" ? "Show More" : "더보기")}
            </span>
          </motion.button>
        )}
      </div>
    </Section>
  );
};
