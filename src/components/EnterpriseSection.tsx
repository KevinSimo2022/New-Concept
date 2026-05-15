"use client";

import { useState } from "react";

export function EnterpriseSection() {
  const [formData, setFormData] = useState({
    companyName: "",
    workEmail: "",
    pingVolume: "",
    pingCriticality: "",
    preferredTimbre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg text-white placeholder-muted-300 bg-bg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all";

  return (
    <section id="enterprise" className="py-20 px-6 lg:px-12 bg-bg">
      <div className="max-w-content mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold leading-tight text-white">
            Built for teams who take
            <br />
            their ping seriously.
          </h2>
          <p className="text-lg leading-relaxed text-muted-100">
            Enterprise-grade ping infrastructure for organizations that demand
            reliability, scalability, and precision. Dedicated support,
            custom SLAs, and advanced waveform analytics.
          </p>
          <ul className="space-y-3 text-muted-100">
            {[
              "99.99% uptime SLA guaranteed",
              "Dedicated account management",
              "Custom integration support",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full bg-surface border border-border rounded-xl p-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Contact our sales team
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-muted-100">
                Company name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Acme Inc."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="workEmail" className="block text-sm font-medium text-muted-100">
                Work email
              </label>
              <input
                type="email"
                id="workEmail"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="pingVolume" className="block text-sm font-medium text-muted-100">
                Expected monthly ping volume
              </label>
              <select
                id="pingVolume"
                name="pingVolume"
                value={formData.pingVolume}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select volume</option>
                <option value="1-1000">1–1,000</option>
                <option value="1K-10K">1K–10K</option>
                <option value="10K-100K">10K–100K</option>
                <option value="100K+">100K+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="pingCriticality" className="block text-sm font-medium text-muted-100">
                Ping criticality
              </label>
              <select
                id="pingCriticality"
                name="pingCriticality"
                value={formData.pingCriticality}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select criticality</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="business-critical">Business-critical</option>
                <option value="mission-critical">Mission-critical</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="preferredTimbre" className="block text-sm font-medium text-muted-100">
                Preferred timbre
              </label>
              <select
                id="preferredTimbre"
                name="preferredTimbre"
                value={formData.preferredTimbre}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select timbre</option>
                <option value="classic">Classic</option>
                <option value="warm">Warm</option>
                <option value="crystal">Crystal</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-semibold bg-accent text-accent-fg transition-all hover:opacity-90 active:scale-[0.98] mt-2"
            >
              Get in touch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
