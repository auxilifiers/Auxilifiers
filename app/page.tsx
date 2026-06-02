import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import Pillars from "@/components/sections/Pillars";
import Testimonials from "@/components/sections/Testimonials";
import FAQs from "@/components/sections/FAQs";
import FooterCta from "@/components/sections/FooterCta";
import { buildMetadata } from "@/lib/page-seo";
import PageSeoSchema from "@/components/PageSeoSchema";

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata("/");
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <PageSeoSchema path="/" />
      <Hero />
      <ServicesMarquee />
      <Pillars />
      <Testimonials />
      <FAQs />
      <FooterCta />
    </div>
  );
}
