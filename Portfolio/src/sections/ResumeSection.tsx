"use client";

import { Section } from "../components/Section";
import { Timeline } from "../components/timeline";
import { useLanguage } from "../context/LanguageContext";

export const ResumeSection = ({ id }: { id?: string }) => {
  const { language } = useLanguage();

  const resumeData = [
    { 
      period: "2025.04 ~ 2026.01", 
      title: language === 'ENG' 
        ? "Freelancer (Website Outsourcing) | Full Stack Developer" 
        : "프리랜서 (웹개발 외주) | 풀스택 개발자",
      skills: "React, Framer, Typescript, Express, PostgreSQL, Toss Payments API, SOLAPI",
      description: language === 'ENG'
        ? [
            "Full-Stack development outsourcing for the accommodation booking platform 'TERENE'.",
            "Developed booking and payment pages, user and admin pages based on React.",
            "Designed and built the backend based on Express and PostgreSQL for operation."
          ]
        : [
            "숙박 예약 플랫폼 'TERENE' 웹 서비스 Full-Stack 개발 외주",
            "React 기반으로 예약 및 결제 페이지, 회원 및 관리자 페이지 개발",
            "Express와 PostgreSQL 기반 백엔드를 설계 및 구축하여 운영"
          ]
    },
    { 
      period: "2024.12 ~ 2025.02", 
      title: language === 'ENG' ? "Com2us Internship | AI Researcher" : "컴투스 인턴십 | AI 연구원",
      skills: "Python, LLM, Embedding Model, RAG, Milvus",
      description: language === 'ENG'
        ? ["Developed a RAG-based AI chatbot system for internal employee search."]
        : ["사내 직원 검색용 RAG 기반 AI 챗봇 시스템 개발"]
    },
    { 
      period: "2024.06 ~ 2024.10", 
      title: language === 'ENG' ? "SKT AI Fellowship | AI Researcher · Unity Developer" : "SKT AI 펠로우십 | AI 연구원 · 유니티 개발자",
      skills: "Unity, C#, Meta Quest 3 VR, Python, LLM, Meshy.ai API, STT",
      description: language === 'ENG'
        ? ["VR-based AI learning assistant system development project."]
        : ["VR 기반 AI 학습 어시스턴트 시스템 개발 프로젝트"]
    },
  ];

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center md:items-start gap-16 md:gap-24"
    >
      {/* Profile Image */}
      <div className="relative w-64 h-64 md:w-full md:max-w-sm md:aspect-square md:h-auto justify-self-center md:justify-self-start">
        <div className="absolute inset-0 bg-neutral-100" />
        <img
          src="/profile.png"
          alt="Profile"
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-cover shadow-xl transition-all duration-500"
        />
      </div>

      {/* Timeline */}
      <div className="w-full">
        <Timeline title={"Resume."} items={resumeData} />
      </div>
    </Section>
  );
};
