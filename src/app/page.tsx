import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCards } from "@/components/home/ServiceCards";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FAQSection } from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <TrustBadges />
      <FAQSection />
    </>
  );
}
