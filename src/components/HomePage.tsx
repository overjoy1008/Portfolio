"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Github, Linkedin, Mail, Youtube, FileText } from "lucide-react";
import { TypingText } from "./typingText";
import { SocialLink } from "./socialLink";
import { EmailModal } from "./emailModal";
import { ScrollDown } from "./scrollDown";
import { ResumeSection } from "../sections/ResumeSection";
import { SkillsSection } from "../sections/SkillsSection";
import { PortfolioSection } from "../sections/PortfolioSection";
import { EducationSection } from "../sections/EducationSection";
import { CertificationsSection } from "../sections/CertificationsSection";
import { InspireSection } from "../sections/InspireSection";
import { useLanguage } from "../context/LanguageContext";

export function HomePage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      <main className="min-h-screen bg-white flex flex-col items-center">
        <div className="relative min-h-[90vh] flex items-center justify-center w-full p-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center gap-12">
            <div className="flex flex-col items-center justify-center text-center">
              <TypingText
                text={language === "ENG" ? "Kyoungbin Park" : "Kyoungbin Park | 박경빈"}
                isCompact={language !== "ENG"}
              />

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "circOut" }}
                className="my-6 h-px w-24 bg-neutral-200"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-12"
              >
                <div className="flex flex-col gap-3">
                  <p className="font-noto text-[clamp(0.95rem,2vw,1.125rem)] md:text-[clamp(1.125rem,2.2vw,1.5rem)] lg:text-[clamp(1.35rem,2vw,1.75rem)] text-neutral-700 whitespace-nowrap">
                    {language === "ENG" ? (
                      <>
                        Hello, I&apos;m a <span className="font-bold">Full Stack Developer</span> ·{" "}
                        <span className="font-bold">AI Engineer</span> ·{" "}
                        <span className="font-bold">Music Producer</span>
                      </>
                    ) : (
                      <>
                        안녕하세요, 저는 <span className="font-bold">풀스택 개발자</span> ·{" "}
                        <span className="font-bold">AI 엔지니어</span> ·{" "}
                        <span className="font-bold">음악 프로듀서</span>입니다.
                      </>
                    )}
                  </p>

                  <div className="flex items-center justify-center gap-1.5 text-neutral-500 font-noto text-[clamp(0.875rem,1.8vw,1rem)] md:text-[clamp(1rem,1.8vw,1.125rem)]">
                    <MapPin size={18} className="text-neutral-400" />
                    <span>{language === "ENG" ? "Seongnam, South Korea" : "경기도 성남시 거주 중"}</span>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                  <SocialLink icon={Github} label="Github" href="https://github.com/overjoy1008" />
                  <SocialLink icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/overjoy1008" />
                  <SocialLink icon={Mail} label="Email" onClick={() => setIsEmailModalOpen(true)} />
                  <SocialLink icon={Youtube} label="Youtube" href="https://www.youtube.com/@grad1_10" />
                  <SocialLink icon={FileText} label="Resume" href="/resume.pdf" />
                </div>
              </motion.div>
            </div>
          </div>

          <ScrollDown />
        </div>

        <div className="w-full p-6 flex flex-col items-center">
          <ResumeSection id="resume" />
          <SkillsSection id="skills" />
          <PortfolioSection id="portfolio" />
          <EducationSection id="education" />
          <CertificationsSection id="certifications" />
          <InspireSection id="inspire" />
        </div>
      </main>

      <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />
    </>
  );
}
