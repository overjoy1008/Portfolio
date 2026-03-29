"use client";

import { useLanguage } from "../context/LanguageContext";
import { Slider } from "./Slider";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const options: ('ENG' | 'KOR')[] = ['ENG', 'KOR'];

  return (
    <div className="flex items-center gap-3">
      <span className="font-noto text-xs font-bold text-neutral-400 uppercase tracking-widest">Language</span>
      <Slider 
        categories={options}
        selectedCategory={language}
        onSelectCategory={(lang) => setLanguage(lang as 'ENG' | 'KOR')}
        size="sm"
        layoutId="active-lang-pill"
      />
    </div>
  );
};
