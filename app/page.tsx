import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import Pillars from "@/components/sections/Pillars";
import Testimonials from "@/components/sections/Testimonials";
import FAQs from "@/components/sections/FAQs";
import FooterCta from "@/components/sections/FooterCta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesMarquee />
      <Pillars />
      <Testimonials />
      <FAQs />
      <FooterCta />
    </div>
  );
}
