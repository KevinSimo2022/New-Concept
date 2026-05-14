import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PricingCards } from "@/components/PricingCards";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <Navbar />
      <main>
        <Hero />
        <TestimonialsSection />
        <PricingCards />
        <EnterpriseSection />
      </main>
      <Footer />
    </div>
  );
}
