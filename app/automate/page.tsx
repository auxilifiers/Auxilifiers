import type { Metadata } from "next";
import PillarPage from "@/components/sections/PillarPage";

export const metadata: Metadata = {
  title: "Automate — AI Workflows, Chatbots & Voice Agents | Auxilifiers",
  description:
    "AI automations, chatbots, voice agents, CRM sync, and inbox triage. Turn the boring repetitive work into systems that run themselves, 24/7.",
  openGraph: {
    title: "Automate with Auxilifiers",
    description:
      "AI workflows, chatbots, voice agents, and CRM automation that free up your team.",
    type: "website",
  },
};

export default function AutomatePage() {
  return <PillarPage pillarId="automate" />;
}
