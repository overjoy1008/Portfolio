import { blankItProject } from "./blankIt";
import { com2usProject } from "./com2us";
import { eventSepProject } from "./eventsep";
import { sktAiFellowshipProject } from "./sktAiFellowship";
import { tereneProject } from "./terene";

export { blankItProject, com2usProject, eventSepProject, sktAiFellowshipProject, tereneProject };
export type { Project, ProjectLink } from "./types";

export const portfolioProjects = [
  tereneProject,
  eventSepProject,
  com2usProject,
  sktAiFellowshipProject,
  blankItProject,
];
