"use client";

import { Section } from "../components/Section";
import { Timeline } from "../components/timeline";
import { useLanguage } from "../context/LanguageContext";

export const EducationSection = ({ id }: { id?: string }) => {
  const { language } = useLanguage();

  const educationData = [
    {
      period: "2021 ~ 2026",
      title:
        language === "ENG"
          ? "Korea University | Electrical Engineering & Computer Science (Double Major)"
          : "고려대학교 | 전기전자공학부 & 컴퓨터학과(이중전공)",
      skills: "",
      description: [
        language === "ENG" ? "Bachelor's Degree" : "학사 졸업 예정 (2026.08)",
        language === "ENG" ? "**Grade: 4.15/4.5**" : "**학점: 4.15/4.5**",
      ],
    },
  ];

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="flex flex-col items-center md:items-start justify-center"
    >
      <Timeline title={"Education."} items={educationData} />
    </Section>
  );
};
