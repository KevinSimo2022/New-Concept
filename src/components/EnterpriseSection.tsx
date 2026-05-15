"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const bullets = [
  "99.99% uptime SLA guaranteed",
  "Dedicated account management",
  "Custom integration support",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 10,
  color: "#FFFFFF",
  background: "rgba(10,10,11,0.6)",
  border: "1px solid rgba(255,255,255,0.07)",
  outline: "none",
  fontSize: "14px",
  fontFamily: "var(--font-geist-sans)",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

function GlassInput({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder,
  required,
}: {
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        borderColor: focused ? "rgba(0,229,204,0.4)" : "rgba(255,255,255,0.07)",
        boxShadow: focused ? "0 0 0 3px rgba(0,229,204,0.08)" : "none",
      }}
    />
  );
}

function GlassSelect({
  id,
  name,
  value,
  onChange,
  children,
  required,
}: {
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        borderColor: focused ? "rgba(0,229,204,0.4)" : "rgba(255,255,255,0.07)",
        boxShadow: focused ? "0 0 0 3px rgba(0,229,204,0.08)" : "none",
        appearance: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </select>
  );
}

export function EnterpriseSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
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

  return (
    <section
      id="enterprise"
      style={{
        padding: "100px 24px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,40,255,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-20%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      <div
        ref={sectionRef}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: isMobile ? "40px" : "80px",
          alignItems: "start",
          position: "relative",
        }}
      >
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <h2
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Built for teams who take
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 20%, rgba(0,229,204,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              their ping seriously.
            </span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#71717A",
              margin: 0,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Enterprise-grade ping infrastructure for organizations that demand reliability,
            scalability, and precision. Dedicated support, custom SLAs, and advanced waveform
            analytics.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {bullets.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00E5CC",
                    boxShadow: "0 0 8px rgba(0,229,204,0.5)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "15px", color: "#A0A0A8", fontFamily: "var(--font-geist-sans)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right form – glass card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: "rgba(10,10,11,0.65)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            marginTop: 80,   /* drops the form card lower than the copy */
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: 24,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Contact our sales team
          </h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            {[
              { id: "companyName", label: "Company name", type: "text", placeholder: "Acme Inc." },
              { id: "workEmail", label: "Work email", type: "email", placeholder: "you@company.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#71717A",
                    marginBottom: 8,
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  {label}
                </label>
                <GlassInput
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            {[
              {
                id: "pingVolume",
                label: "Expected monthly ping volume",
                options: [
                  { value: "1-1000", label: "1–1,000" },
                  { value: "1K-10K", label: "1K–10K" },
                  { value: "10K-100K", label: "10K–100K" },
                  { value: "100K+", label: "100K+" },
                ],
              },
              {
                id: "pingCriticality",
                label: "Ping criticality",
                options: [
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "business-critical", label: "Business-critical" },
                  { value: "mission-critical", label: "Mission-critical" },
                ],
              },
              {
                id: "preferredTimbre",
                label: "Preferred timbre",
                options: [
                  { value: "classic", label: "Classic" },
                  { value: "warm", label: "Warm" },
                  { value: "crystal", label: "Crystal" },
                ],
              },
            ].map(({ id, label, options }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#71717A",
                    marginBottom: 8,
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  {label}
                </label>
                <GlassSelect
                  id={id}
                  name={id}
                  value={formData[id as keyof typeof formData]}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select…</option>
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </GlassSelect>
              </div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                border: "none",
                background: "#00E5CC",
                color: "#001a17",
                fontFamily: "var(--font-geist-sans)",
                marginTop: 6,
                boxShadow: "0 0 24px rgba(0,229,204,0.25)",
              }}
            >
              Get in touch
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
