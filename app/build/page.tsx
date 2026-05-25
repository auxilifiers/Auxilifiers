import type { Metadata } from "next";
import PillarPage from "@/components/sections/PillarPage";

export const metadata: Metadata = {
  title: "Build — Websites, Apps, Stores & Integrations | Auxilifiers",
  description:
    "Custom websites, mobile apps, Shopify stores, and tool integrations. Built to convert, engineered to last. Explore Auxilifiers' Build pillar services.",
  openGraph: {
    title: "Build with Auxilifiers",
    description:
      "Custom websites, mobile apps, Shopify stores, and integrations built to convert.",
    type: "website",
  },
};

export default function BuildPage() {
  return <PillarPage pillarId="build" />;
}
