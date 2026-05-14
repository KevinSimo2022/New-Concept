"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "We switched from a competing ping provider. The latency improvement was imperceptible, but our team felt it.",
    name: "Sarah Chen",
    title: "Engineering Lead at Stripe",
  },
  {
    quote: "Finally, a ping solution with genuine enterprise SLA backing. The 30-day refund policy gave us confidence.",
    name: "Marcus Johnson",
    title: "Product Manager at Linear",
  },
  {
    quote: "The AI* handles our 3am critical-path pings with a consistency we hadn't achieved in-house.",
    name: "Emily Rodriguez",
    title: "CEO at Notion",
  },
  {
    quote: "Simple, elegant, and effective. Our mean time to ping dropped by 60%.",
    name: "David Kim",
    title: "CTO at Vercel",
  },
  {
    quote: "I've evaluated dozens of ping platforms. PNGD is the only one that understood our timbre requirements.",
    name: "Alex Thompson",
    title: "Design Director at Figma",
  },
  {
    quote: "The waveform analytics alone justified the contract. Everything else was a bonus.",
    name: "Rachel Park",
    title: "Operations Lead at Slack",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </div>
  );
}

function TestimonialCard({ quote, name, title }: { quote: string; name: string; title: string }) {
  return (
    <div className="flex-shrink-0 w-[300px] p-6 rounded-xl border border-border bg-surface">
      <StarRating />
      <p className="italic mb-4 text-sm leading-relaxed text-muted-100">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="font-medium text-sm text-muted-300">{name}</p>
        <p className="text-xs text-muted-300">{title}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="research" className="py-20 px-6 bg-bg">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          People have heard the ping.
        </h2>
        <div
          className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
