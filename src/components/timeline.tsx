"use client";

import { TimelineItem } from "./timelineItem";

interface TimelineData {
  period: string;
  title: string;
  skills: string;
  description: string[];
}

interface TimelineProps {
  title: string;
  items: TimelineData[];
}

export const Timeline = ({ title, items }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      <h3 className="font-noto text-4xl md:text-5xl font-black text-neutral-700 text-left tracking-tighter">
        {title}
      </h3>
      <div className="relative flex flex-col gap-12">
        {/* Continuous Vertical Line with Gradient Fade */}
        <div className="absolute left-[7px] top-[-12px] bottom-[0px] w-[2px] bg-[linear-gradient(to_bottom,transparent,#404040_24px,#404040_calc(100%-40px),transparent)]" />
        
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            period={item.period}
            title={item.title}
            skills={item.skills}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
