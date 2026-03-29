import { Project } from "./types";

export const blankItProject: Project = {
  id: "ttuleoboka",
  thumbnail: "https://picsum.photos/seed/ttuleoboka/800/600",
  title: {
    ENG: "Blank-It: LLM Quiz Generator",
    KOR: "뚫어보카: LLM 기반 시험 문제 생성 서비스"
  },
  tags: ["Web", "LLM"],
  description: {
    ENG: "A web service that generates fill-in-the-blank quizzes from lecture PPT files.",
    KOR: "강의 PPT를 바탕으로 빈칸 문제를 생성하는 LLM 기반 웹서비스"
  },
  links: [],
  contentPath: {
    ENG: "/content/portfolio/blank-it/ENG.md",
    KOR: "/content/portfolio/blank-it/KOR.md"
  }
};
