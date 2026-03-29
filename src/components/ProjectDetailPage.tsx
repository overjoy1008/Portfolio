"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { portfolioProjects } from "../data/portfolioData";
import { useLanguage } from "../context/LanguageContext";
import { ProjectMarkdownContent } from "./ProjectMarkdownContent";

export const ProjectDetailPage: React.FC<{ id: string }> = ({ id }) => {
  const { language } = useLanguage();
  const [content, setContent] = useState("");

  const project = portfolioProjects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!project) {
      return;
    }

    let isCancelled = false;

    const loadContent = async () => {
      try {
        const response = await fetch(project.contentPath[language]);
        const markdown = await response.text();

        if (!isCancelled) {
          setContent(markdown);
        }
      } catch {
        if (!isCancelled) {
          setContent("");
        }
      }
    };

    void loadContent();

    return () => {
      isCancelled = true;
    };
  }, [language, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">Project not found.</p>
        <Link href="/" className="ml-4 text-neutral-900 underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white pb-24"
    >
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="w-full aspect-[21/6.5] overflow-hidden bg-neutral-100 mb-12 shadow-sm">
          <img
            src={project.thumbnail}
            alt={project.title[language]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 mb-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{
                    scale: 1.05,
                    scaleX: 1.08,
                    scaleY: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    scaleX: 0.92,
                    scaleY: 0.98,
                    transition: { type: "spring", stiffness: 350, damping: 25 },
                  }}
                  className="font-noto px-3 py-1.5 bg-neutral-50 text-neutral-500 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-neutral-100 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-8 md:gap-12">
              {project.links.map((link, idx) => {
                const Icon = link.icon;
                const label = link.type === "github" ? "Github" : "Demo";
                return (
                  <motion.a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <motion.div
                      className="p-3 rounded-2xl bg-neutral-50 group-hover:bg-neutral-100 transition-colors duration-300"
                      whileHover={{
                        scale: 1.06,
                        scaleX: 1.08,
                        scaleY: 1.04,
                        transition: { type: "spring", stiffness: 300, damping: 20 },
                      }}
                      whileTap={{
                        scale: 0.94,
                        scaleX: 0.92,
                        scaleY: 0.96,
                        transition: { type: "spring", stiffness: 350, damping: 25 },
                      }}
                    >
                      <Icon
                        size={24}
                        className="text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300"
                      />
                    </motion.div>
                    <span className="font-noto text-[10px] font-bold text-neutral-500 group-hover:text-neutral-900 transition-colors duration-300 uppercase tracking-widest">
                      {label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 id="project-title" className="font-noto text-4xl md:text-5xl font-black text-neutral-800 tracking-tighter">
              {project.title[language]}
            </h1>

            <p className="font-noto text-xl text-neutral-500 leading-relaxed max-w-2xl">
              {project.description[language]}
            </p>
          </div>
        </div>

        <div className="markdown-body font-noto prose prose-neutral max-w-none">
          <ProjectMarkdownContent content={content} />
        </div>
      </div>
    </motion.div>
  );
};
