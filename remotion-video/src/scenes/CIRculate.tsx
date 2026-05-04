import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FadeIn } from "../components/FadeIn";
import { SectionLabel } from "../components/SectionLabel";

const stack = [
  "Next.js", "React", "Vercel", "Neon Postgres",
  "Auth0", "Stripe", "Resend", "GitHub CI/CD",
];

const highlights = [
  { num: "60", unit: "days", desc: "Zero to demo-ready" },
  { num: "1", unit: "hire", desc: "Founding technical hire" },
  { num: "100%", unit: "", desc: "Production owned end-to-end" },
];

export const CIRculate: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const slideIn = interpolate(frame, [0, 25], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: THEME.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 120px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Right accent line */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: `linear-gradient(180deg, transparent, ${THEME.accent}, transparent)`,
          opacity,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          width: "100%",
          maxWidth: 1400,
          opacity,
          transform: `translateX(${slideIn}px)`,
        }}
      >
        {/* Left: highlights */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          {highlights.map((h, i) => (
            <FadeIn key={h.desc} delay={15 + i * 20} duration={15} translateY={15}>
              <div
                style={{
                  background: THEME.bgCard,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 16,
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: 52,
                      fontWeight: 800,
                      color: THEME.accentLight,
                      fontFamily: THEME.fontFamily,
                      letterSpacing: "-2px",
                      lineHeight: 1,
                    }}
                  >
                    {h.num}
                  </span>
                  {h.unit && (
                    <span
                      style={{
                        fontSize: 20,
                        color: THEME.accent,
                        fontFamily: THEME.fontFamily,
                        fontWeight: 600,
                        marginLeft: 4,
                      }}
                    >
                      {h.unit}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    color: THEME.muted,
                    fontFamily: THEME.fontFamily,
                  }}
                >
                  {h.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Right: company info + stack */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SectionLabel>Startup · Aug 2025 – Apr 2026</SectionLabel>

          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: THEME.white,
              fontFamily: THEME.fontFamily,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            CIRculate
          </div>

          <div
            style={{
              fontSize: 22,
              color: THEME.accentLight,
              fontFamily: THEME.fontFamily,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Founding Technical Operations Engineer
          </div>

          <div
            style={{
              fontSize: 17,
              color: THEME.muted,
              fontFamily: THEME.fontFamily,
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            Built and shipped a full-stack SaaS MVP as the sole technical hire.
            Owned deployment, ops, and the entire cloud stack from day one.
          </div>

          {/* Stack chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {stack.map((tech, i) => (
              <FadeIn key={tech} delay={40 + i * 8} duration={10} translateY={8}>
                <div
                  style={{
                    fontSize: 13,
                    color: THEME.accentLight,
                    background: "rgba(96,165,250,0.08)",
                    border: `1px solid rgba(96,165,250,0.2)`,
                    borderRadius: 6,
                    padding: "5px 12px",
                    fontFamily: THEME.fontMono,
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
