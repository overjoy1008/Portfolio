import { Github } from "lucide-react";
import { Project } from "./types";

export const com2usProject: Project = {
  id: "com2us-employee-search",
  thumbnail: "https://picsum.photos/seed/chatbot/800/600",
  title: {
    ENG: "Self-Updating RAG for Com2us Employee Search",
    KOR: "컴투스 사내 직원 검색용 Self-Updating RAG"
  },
  tags: ["LLM", "AI Research"],
  description: {
    ENG: "RAG-based internal employee search AI chatbot.",
    KOR: "RAG 기반 사내 직원 검색 AI 챗봇"
  },
  links: [
    { type: "github", url: "https://github.com/overjoy1008/ai-chatbot", icon: Github }
  ],
  contentPath: {
    ENG: "/content/portfolio/com2us-employee-search/ENG.md",
    KOR: "/content/portfolio/com2us-employee-search/KOR.md"
  }
};
