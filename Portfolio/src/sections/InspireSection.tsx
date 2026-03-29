"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "../components/Section";
import { Slider } from "../components/Slider";
import { AlbumCard } from "../components/AlbumCard";
import { useLanguage } from "../context/LanguageContext";
import { SONGS } from "../context/MusicContext";

const categoryMap: Record<string, { ENG: string; KOR: string }> = {
  All: { ENG: "All", KOR: "전체" },
  "Hip Hop": { ENG: "Hip Hop", KOR: "힙합" },
  "R&B": { ENG: "R&B", KOR: "알앤비" },
  "K-Pop": { ENG: "K-Pop", KOR: "케이팝" },
};

const internalCategories = ["All", "Hip Hop", "R&B", "K-Pop"];

export const InspireSection = ({ id }: { id?: string }) => {
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

  const filteredSongs = useMemo(() => {
    if (selectedCategory === "All") return SONGS;
    return SONGS.filter(song => song.genre === selectedCategory);
  }, [selectedCategory]);

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="flex flex-col gap-12"
    >
      <div className="flex flex-col gap-8">
        <h3 className="font-noto text-4xl md:text-5xl font-black text-neutral-700 text-left tracking-tighter">
          Inspire.
        </h3>
        
        <Slider 
          categories={categories} 
          selectedCategory={categoryMap[selectedCategory][language]} 
          onSelectCategory={(displayCat) => setSelectedCategory(displayToInternal[displayCat])} 
          layoutId="inspire-active-pill"
        />

        <div className="flex flex-wrap gap-12 justify-start min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredSongs.map((song) => {
              // Find the original index in SONGS to pass to AlbumCard
              const originalIndex = SONGS.findIndex(s => s.title === song.title);
              return (
                <AlbumCard 
                  key={song.title} 
                  index={originalIndex}
                  title={song.title}
                  cover={song.cover}
                  genre={song.genre}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};
