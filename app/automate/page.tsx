import PillarPage from "@/components/sections/PillarPage";
import { buildMetadata } from "@/lib/page-seo";
import PageSeoSchema from "@/components/PageSeoSchema";

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata("/automate");
}

export default function AutomatePage() {
  return (
    <>
      <PageSeoSchema path="/automate" />
      <PillarPage pillarId="automate" />
    </>
  );
}
