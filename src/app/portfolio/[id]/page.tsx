import { ProjectDetailPage } from "../../../components/ProjectDetailPage";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectDetailPage id={id} />;
}
