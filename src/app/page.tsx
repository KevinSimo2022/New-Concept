import { Navbar } from "@/components/Navbar";
import { PricingCards } from "@/components/PricingCards";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — R3F waveform canvas goes here (Phase 04) */}
        <section className="min-h-screen flex flex-col items-center justify-center bg-bg px-6">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-muted-300 mb-6">
            AI-Powered Audio. Delivered.
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white text-center tracking-tight leading-none mb-8">
            PNGD™
          </h1>
          <p className="text-muted-100 text-lg text-center max-w-xl mb-10">
            The world&apos;s first AI* platform built exclusively for the
            humble ping sound.
          </p>
          <a
            id="get-started"
            href="#pricing"
            className="rounded-full bg-accent text-accent-fg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Get started
          </a>
          <p className="text-muted-300 text-xs mt-4">* Adobe Audition</p>
        </section>

        <TestimonialsSection />
        <PricingCards />
        <EnterpriseSection />
      </main>
      <Footer />
    </>
  );
}
