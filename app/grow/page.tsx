import type { Metadata } from "next";
import PillarPage from "@/components/sections/PillarPage";

export const metadata: Metadata = {
  title: "Grow — SEO, Google Ads, Meta Ads & Social | Auxilifiers",
  description:
    "SEO, Google Ads, Facebook & Instagram ads, social media management, and content. The reach and revenue that compound month over month.",
  openGraph: {
    title: "Grow with Auxilifiers",
    description:
      "SEO, paid ads, social, and content engineered to compound your reach.",
    type: "website",
  },
};

export default function GrowPage() {
  return <PillarPage pillarId="grow" />;
}
