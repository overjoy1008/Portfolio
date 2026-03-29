import { ExternalLink, Github } from "lucide-react";
import { Project } from "./types";

export const eventSepProject: Project = {
  id: "eventsep",
  thumbnail: "/content/portfolio/eventsep/thumbnail.jpg",
  title: {
    ENG: "EventSep: Language-Guided Audio Separation",
    KOR: "EventSep: 자연어 기반 오디오 분리 연구"
  },
  tags: ["AI Research"],
  description: {
    ENG: "Audio separation research for isolating target sounds from natural language prompts.",
    KOR: "자연어 설명을 바탕으로 원하는 소리만 분리하는 오디오 AI 연구"
  },
  links: [
    { type: "github", url: "https://github.com/overjoy1008/EventSep", icon: Github },
    { type: "demo", url: "https://eventsep-demo.onrender.com", icon: ExternalLink }
  ],
  contentPath: {
    ENG: "/content/portfolio/eventsep/ENG.md",
    KOR: "/content/portfolio/eventsep/KOR.md"
  }
};
