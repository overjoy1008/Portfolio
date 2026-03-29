import { LucideIcon } from "lucide-react";

export interface ProjectLink {
  type: "github" | "demo";
  url: string;
  icon: LucideIcon;
}

export interface Project {
  id: string;
  thumbnail: string;
  title: {
    ENG: string;
    KOR: string;
  };
  tags: string[];
  description: {
    ENG: string;
    KOR: string;
  };
  links: ProjectLink[];
  contentPath: {
    ENG: string;
    KOR: string;
  };
}
