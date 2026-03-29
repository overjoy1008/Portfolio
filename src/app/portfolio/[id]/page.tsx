import { ProjectDetailPage } from "../../../components/ProjectDetailPage";
import { portfolioProjects } from "../../../data/portfolioData";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.id,
  }));
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectDetailPage id={id} />;
}
