import { ExternalLink, Github } from "lucide-react";
import { Project } from "./types";

export const sktAiFellowshipProject: Project = {
  id: "skt-ai-fellowship",
  thumbnail: "/content/portfolio/skt-ai-fellowship/thumbnail.png",
  title: {
    ENG: "VR-Based AI Learning Assistant (SKT AI Fellowship)",
    KOR: "VR 기반 AI 학습 어시스턴트 (SKT AI Fellowship)"
  },
  tags: ["VR", "AI Research"],
  description: {
    ENG: "VR-based AI learning assistant system.",
    KOR: "VR 기반 AI 학습 어시스턴트 시스템"
  },
  links: [
    { type: "github", url: "https://github.com/SKT-AI-Fellowship-Metaphor/VR-Dinosaur-Museum", icon: Github },
    { type: "demo", url: "https://drive.google.com/file/d/1WGmMBFYE4gbls7s0fGj0YVqr5cjdAzlU/view?usp=drive_link", icon: ExternalLink }
  ],
  contentPath: {
    ENG: "/content/portfolio/skt-ai-fellowship/ENG.md",
    KOR: "/content/portfolio/skt-ai-fellowship/KOR.md"
  }
};
