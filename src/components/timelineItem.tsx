"use client";

import React from "react";
import { motion } from "motion/react";

interface TimelineItemProps {
  period: string;
  title: string;
  skills: string;
  description: string[];
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ period, title, skills, description }) => {
  const renderDescriptionText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-neutral-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="flex gap-4">
      <div className="relative flex flex-col items-center flex-shrink-0 w-4">
        <div className="relative z-10 mt-3 h-3 w-3 rounded-full bg-neutral-700 flex-shrink-0" />
      </div>

      <div className="flex flex-col gap-2 text-left flex-1">
        <motion.div
          className="w-fit px-3 py-1 bg-neutral-50 rounded-lg border border-neutral-100 cursor-default"
          whileHover={{
            scale: 1.03,
            scaleX: 1.04,
            scaleY: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          whileTap={{
            scale: 0.97,
            scaleX: 0.96,
            scaleY: 0.98,
            transition: { type: "spring", stiffness: 350, damping: 25 },
          }}
        >
          <span className="font-noto text-sm font-bold text-neutral-700 uppercase tracking-wider">
            {period}
          </span>
        </motion.div>

        <div className="flex flex-col gap-3 px-3">
          <h4 className="font-noto text-base font-bold text-neutral-700 flex items-center gap-1 flex-wrap">
            {title.includes("|") ? (
              title.split("|").map((part, i, arr) => (
                <React.Fragment key={i}>
                  <span>{part.trim()}</span>
                  {i < arr.length - 1 && <div className="h-4 w-[2px] bg-neutral-500 mx-1" />}
                </React.Fragment>
              ))
            ) : (
              title
            )}
          </h4>

          <div className="flex flex-col gap-3">
            {skills && (
              <div className="flex items-start gap-2">
                <span className="font-noto h-5 text-sm font-bold text-neutral-700 tracking-widest flex-shrink-0">
                  Skills:
                </span>
                <p className="font-noto text-sm text-neutral-700 font-normal">{skills}</p>
              </div>
            )}
            <ul className="flex flex-col gap-1 list-disc list-inside">
              {description.map((item, i) => (
                <li key={i} className="font-noto text-sm text-neutral-700 font-normal leading-relaxed">
                  <span className="relative left-[-4px]">{renderDescriptionText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
