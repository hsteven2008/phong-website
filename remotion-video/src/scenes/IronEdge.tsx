import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FadeIn } from "../components/FadeIn";
import { SectionLabel } from "../components/SectionLabel";

const bullets = [
  { icon: "⚙", text: "Active Directory & Microsoft 365 for 100+ employees" },
  { icon: "🎫", text: "50+ weekly tickets — 95% first-contact resolution" },
  { icon: "🔧", text: "Tier-2 escalations: AD replication, M365, VPN/firewall" },
  { icon: "🤖", text: "ImmyBot automated endpoint deployment — 20+ machines/week" },
  { icon: "📋", text: "ConnectWise ITSM · IT Glue runbooks · ScreenConnect remote support" },
];

export const IronEdge: React.FC = () => {
  const frame = useCurrentFrame();

  const slideIn = interpolate(frame, [0, 25], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

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
      {/* Left accent line */}
      <div
        style={{
          position: "absolute",
          left: 0,
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
        {/* Left: company info */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SectionLabel>MSP Experience · Apr 2024 – Jul 2025</SectionLabel>

          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: THEME.white,
              fontFamily: THEME.fontFamily,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            IronEdge Group
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
            IT Support Technician
          </div>

          <div
            style={{
              fontSize: 17,
              color: THEME.muted,
              fontFamily: THEME.fontFamily,
              lineHeight: 1.6,
            }}
          >
            One of Houston's largest MSPs. Grew from Onboarding Technician
            to IT Support Technician in 15 months.
          </div>

          {/* Stat pill */}
          <div
            style={{
              marginTop: 28,
              display: "inline-flex",
              gap: 12,
            }}
          >
            {["Onboarding", "Service Coordinator", "IT Support"].map((role, i) => (
              <FadeIn key={role} delay={30 + i * 15} duration={12} translateY={10}>
                <div
                  style={{
                    fontSize: 13,
                    color: THEME.accent,
                    background: "rgba(37,99,235,0.1)",
                    border: `1px solid ${THEME.border}`,
                    borderRadius: 20,
                    padding: "5px 14px",
                    fontFamily: THEME.fontMono,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {role}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Right: bullets */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
          {bullets.map((b, i) => (
            <FadeIn key={b.text} delay={20 + i * 20} duration={15} translateY={15}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  background: THEME.bgCard,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 12,
                  padding: "14px 18px",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
                <span
                  style={{
                    fontSize: 16,
                    color: THEME.white,
                    fontFamily: THEME.fontFamily,
                    lineHeight: 1.5,
                  }}
                >
                  {b.text}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};
