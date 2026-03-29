import { ExternalLink, Github } from "lucide-react";
import { Project } from "./types";

export const tereneProject: Project = {
  id: "terene",
  thumbnail: "/content/portfolio/terene/thumbnail.jpg",
  title: {
    ENG: "TERENE: Booking Platform Website (Outsourcing)",
    KOR: "TERENE: 숙박 예약 플랫폼 웹사이트 외주 개발"
  },
  tags: ["Web"],
  description: {
    ENG: "Full-stack development for an accommodation booking platform.",
    KOR: "숙박 예약 플랫폼 'TERENE' 풀스택 개발"
  },
  links: [
    { type: "github", url: "https://github.com/overjoy1008/TereneHandover", icon: Github },
    { type: "demo", url: "https://terene.kr", icon: ExternalLink }
  ],
  contentPath: {
    ENG: "/content/portfolio/terene/ENG.md",
    KOR: "/content/portfolio/terene/KOR.md"
  }
};
