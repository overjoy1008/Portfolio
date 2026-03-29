import { Github } from "lucide-react";
import { Project } from "./types";

export const blankItProject: Project = {
  id: "ttuleoboka",
  thumbnail: "/content/portfolio/blank-it/thumbnail.png",
  title: {
    ENG: "Blank-It: LLM Quiz Generator",
    KOR: "뚫어보카: LLM 기반 시험 문제 생성 서비스"
  },
  tags: ["Web", "LLM"],
  description: {
    ENG: "A web service that generates fill-in-the-blank quizzes from lecture PPT files.",
    KOR: "강의 PPT를 바탕으로 빈칸 문제를 생성하는 LLM 기반 웹서비스"
  },
  links: [
    { type: "github", url: "https://github.com/taykim01/product_makers", icon: Github }
  ],
  contentPath: {
    ENG: "/content/portfolio/blank-it/ENG.md",
    KOR: "/content/portfolio/blank-it/KOR.md"
  }
};
