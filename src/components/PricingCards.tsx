"use client";

import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "For individuals who need one good ping.",
    features: [
      "Up to 5 pings / month",
      "Basic waveform analytics",
      "48-hour support response",
      "1GB audio storage",
      "API* access",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For teams who take their ping seriously.",
    features: [
      "Unlimited pings",
      "Advanced waveform analytics",
      "Priority support",
      "25GB audio storage",
      "API* access",
      "Custom timbre controls",
      "Team collaboration",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations with mission-critical pings.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Unlimited storage",
      "Custom SLA",
      "99.99% uptime guarantee",
      "On-premise deployment",
    ],
    featured: false,
  },
];

export function PricingCards() {
  return (
    <section id="pricing" className="py-20 px-4 bg-bg">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-200 text-lg max-w-2xl mx-auto">
            Choose the plan that&apos;s right for you. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                tier.featured
                  ? "bg-surface border-2 border-accent scale-105 shadow-[0_0_40px_-10px_rgba(0,229,204,0.3)]"
                  : "bg-surface border border-border hover:border-border-hover"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-fg text-sm font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-muted-200 text-sm">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">{tier.price}</span>
                <span className="text-muted-200">{tier.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        tier.featured ? "bg-accent/20" : "bg-muted-400"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${tier.featured ? "text-accent" : "text-muted-200"}`}
                      />
                    </div>
                    <span className="text-muted-100 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  tier.featured
                    ? "bg-accent text-accent-fg hover:opacity-90"
                    : "bg-muted-400 text-white hover:bg-border"
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-300 text-xs mt-10">
          * Adobe Audition
        </p>
      </div>
    </section>
  );
}
