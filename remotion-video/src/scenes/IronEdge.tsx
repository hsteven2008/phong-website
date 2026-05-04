import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";
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
  const { durationInFrames } = useVideoConfig();

  const slideIn = interpolate(frame, [0, 28], [-80, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const contentOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: LIGHT.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 120px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * exitOpacity,
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(180deg, transparent, ${LIGHT.accent}, transparent)`, opacity: contentOpacity }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${LIGHT.grid} 1px, transparent 1px), linear-gradient(90deg, ${LIGHT.grid} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          width: "100%",
          maxWidth: 1400,
          opacity: contentOpacity,
          transform: `translateX(${slideIn}px)`,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left: company info — visible while narrator introduces company (local 0–284) */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SectionLabel>MSP Experience · Apr 2024 – Jul 2025</SectionLabel>

          <div style={{ fontSize: 52, fontWeight: 800, color: LIGHT.text, fontFamily: LIGHT.fontFamily, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20 }}>
            IronEdge Group
          </div>
          <div style={{ fontSize: 22, color: LIGHT.accent, fontFamily: LIGHT.fontFamily, fontWeight: 500, marginBottom: 16 }}>
            IT Support Technician
          </div>
          <div style={{ fontSize: 17, color: LIGHT.muted, fontFamily: LIGHT.fontFamily, lineHeight: 1.6 }}>
            One of Houston's largest MSPs. Grew from Onboarding Technician
            to IT Support Technician in 15 months.
          </div>

          {/* Role pills — appear during company intro section */}
          <div style={{ marginTop: 28, display: "inline-flex", gap: 12 }}>
            {["Onboarding", "Service Coordinator", "IT Support"].map((role, i) => (
              <FadeIn key={role} delay={30 + i * 50} duration={14} translateY={10}>
                <div style={{ fontSize: 13, color: LIGHT.accent, background: "rgba(37,99,235,0.08)", border: `1px solid ${LIGHT.border}`, borderRadius: 20, padding: "5px 14px", fontFamily: LIGHT.fontMono, fontWeight: 500, whiteSpace: "nowrap" }}>
                  {role}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Right: bullets — appear when narrator lists work items at local ~284 */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
          {bullets.map((b, i) => (
            <FadeIn key={b.text} delay={284 + i * 60} duration={20} translateY={15}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, background: LIGHT.card, border: `1px solid ${LIGHT.border}`, borderRadius: 12, padding: "14px 18px", boxShadow: LIGHT.shadow }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
                <span style={{ fontSize: 16, color: LIGHT.text, fontFamily: LIGHT.fontFamily, lineHeight: 1.5 }}>{b.text}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};
