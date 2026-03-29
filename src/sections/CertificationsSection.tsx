"use client";

import { Section } from "../components/Section";
import { Timeline } from "../components/timeline";
import { useLanguage } from "../context/LanguageContext";

export const CertificationsSection = ({ id }: { id?: string }) => {
  const { language } = useLanguage();

  const credentialData = [
    {
      period: "2025.12.07",
      title: "TOEIC",
      skills: "",
      description:
        language === "ENG"
          ? ["Institution: YBM", "Language: English", "**Score: 940 / 990**"]
          : ["기관: YBM", "언어: 영어", "**점수: 940 / 990**"],
    },
    {
      period: "2026.03.22",
      title: "OPIc",
      skills: "",
      description:
        language === "ENG"
          ? [
              "Institution: ACTFL",
              "Language: English",
              "**Grade: AL (Advanced Low | Highest Rank)**",
            ]
          : ["기관: ACTFL", "언어: 영어", "**등급: AL (Advanced Low | 최고 등급)**"],
    },
  ];

  return (
    <Section
      id={id}
      maxWidth="7xl"
      className="flex flex-col items-center md:items-start justify-center"
    >
      <Timeline title={"Certifications."} items={credentialData} />
    </Section>
  );
};
