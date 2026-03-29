"use client";

import { Section } from "../components/Section";
import { Timeline } from "../components/timeline";
import { useLanguage } from "../context/LanguageContext";

export const ResumeSection = ({ id }: { id?: string }) => {
  const { language } = useLanguage();

  const resumeData = [
    {
      period: "2025.04 ~ 2026.01",
      title:
        language === "ENG"
          ? "Freelancer (Website Outsourcing) | Full Stack Developer"
          : "프리랜서 (웹사이트 외주) | 풀스택 개발자",
      skills: "React, Framer, Typescript, Express, PostgreSQL, Toss Payments API, SOLAPI",
      description:
        language === "ENG"
          ? [
              "Built the live accommodation booking platform TERENE as a full-stack outsourcing project.",
              "Converted a Framer-based design into a React, Express, and PostgreSQL service with booking, payment, coupon, member, and admin flows.",
              "Reduced a manual 24-hour booking process to under 5 seconds and supported 70+ real customer reservations after launch.",
            ]
          : [
              "실제 운영용 숙박 예약 플랫폼 TERENE의 풀스택 외주 개발을 담당했습니다.",
              "Framer 시안을 React, Express, PostgreSQL 기반 서비스로 전환해 예약, 결제, 쿠폰, 회원, 관리자 기능을 구현했습니다.",
              "수동 24시간 예약 프로세스를 5초 이내 자동화하고 배포 후 70건 이상의 실제 예약 운영을 지원했습니다.",
            ],
    },
    {
      period: "2024.12 ~ 2025.02",
      title:
        language === "ENG"
          ? "Com2us Internship | AI Researcher"
          : "컴투스 인턴십 | AI 연구원",
      skills: "Python, LLM, Embedding Model, RAG, Milvus",
      description:
        language === "ENG"
          ? [
              "Developed an LLM and RAG-based AI chatbot for internal employee search during my Com2us internship.",
              "Built a weekly-report normalization pipeline, self-updating RAG flow, and fine-tuned retrieval for domain-specific queries.",
              "Improved similarity by 22.7%, boosted Recall@10 by 4.5x, and expanded usage beyond the original team after internal deployment.",
            ]
          : [
              "컴투스 인턴십에서 사내 직원 검색을 위한 LLM·RAG 기반 AI 챗봇 개발을 진행했습니다.",
              "주간보고서 정규화 파이프라인, Self-Updating RAG, 도메인 특화 검색 개선을 위한 파인튜닝을 구현했습니다.",
              "유사도 22.7% 향상과 Recall@10 4.5배 개선을 달성했고, 사내 배포 후 타 부서까지 활용이 확장되었습니다.",
            ],
    },
    {
      period: "2024.06 ~ 2024.10",
      title:
        language === "ENG"
          ? "SKT AI Fellowship | AI Researcher | Unity Developer"
          : "SKT AI Fellowship | AI 연구원 | Unity 개발자",
      skills: "Unity, C#, Meta Quest 3 VR, Python, LLM, Meshy.ai API, STT",
      description:
        language === "ENG"
          ? [
              "Built a Meta Quest 3-based VR AI learning assistant as part of the SKT AI Fellowship.",
              "Led the Unity and VR side while integrating STT, image-to-3D generation, and LLM response pipelines into one end-to-end experience.",
              "Achieved 97% intent classification accuracy, around 2-second response time, and delivered the final demo successfully.",
            ]
          : [
              "SKT AI Fellowship에서 Meta Quest 3 기반 VR AI 학습 어시스턴트 개발을 수행했습니다.",
              "Unity와 VR 인터랙션 구현을 맡아 STT, 이미지-3D 변환, LLM 응답 파이프라인을 하나의 경험으로 통합했습니다.",
              "의도 분류 정확도 97%, 응답 시간 약 2초를 달성했고 최종 시연까지 성공적으로 완료했습니다.",
            ],
    },
  ];

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center md:items-start gap-16 md:gap-24"
    >
      <div className="relative w-64 h-64 md:w-full md:max-w-sm md:aspect-square md:h-auto justify-self-center md:justify-self-start">
        <div className="absolute inset-0 bg-neutral-100" />
        <img
          src="/profile.png"
          alt="Profile"
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-cover shadow-xl transition-all duration-500"
        />
      </div>

      <div className="w-full">
        <Timeline title={"Resume."} items={resumeData} />
      </div>
    </Section>
  );
};
