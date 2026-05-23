import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import Declaration from "@/components/sections/Declaration";
import Pillars from "@/components/sections/Pillars";
import WhyUs from "@/components/sections/WhyUs";
import FooterCta from "@/components/sections/FooterCta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesMarquee />
      <Declaration />
      <Pillars />
      <WhyUs />
      <FooterCta />
    </div>
  );
}
