import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";
import { FadeIn } from "../components/FadeIn";

// Creative Suite and AI tools removed — they confuse IT hiring managers and
// undermine the cloud/ops positioning. Kept to 4 focused groups in a 2x2 grid.
const skillGroups = [
  {
    title: "IT Operations & ITSM",
    icon: "🖥",
    items: ["Technical Support", "ConnectWise", "ScreenConnect", "SLA Compliance", "RBAC", "ImmyBot"],
  },
  {
    title: "Systems & Identity",
    icon: "🔐",
    items: ["Active Directory", "Microsoft 365", "Entra ID / Azure AD", "Intune MDM", "Windows 7–11"],
  },
  {
    title: "Networking",
    icon: "🌐",
    items: ["DNS / DHCP", "VPN Config", "Routers & Switches", "SSL/TLS", "Access Control"],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁",
    items: ["GitHub / Git", "Vercel", "Next.js", "Neon Postgres", "Auth0", "CI/CD", "REST APIs", "PowerShell"],
  },
];

export const Skills: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: "clamp" });

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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 140px",
        boxSizing: "border-box",
        gap: 48,
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * exitOpacity,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${LIGHT.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${LIGHT.grid} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: LIGHT.accent,
            fontFamily: LIGHT.fontMono,
            marginBottom: 10,
          }}
        >
          Skills
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: LIGHT.text,
            fontFamily: LIGHT.fontFamily,
            letterSpacing: "-1px",
          }}
        >
          What I work with.
        </div>
      </div>

      {/* 2×2 grid — focused on IT ops and cloud, no creative/AI noise */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          width: "100%",
          maxWidth: 1300,
          position: "relative",
          zIndex: 2,
        }}
      >
        {skillGroups.map((group, gi) => (
          <FadeIn key={group.title} delay={25 + gi * 40} duration={20} translateY={20}>
            <div
              style={{
                background: LIGHT.card,
                border: `1px solid ${LIGHT.border}`,
                borderRadius: 16,
                padding: "28px 32px",
                boxShadow: LIGHT.shadow,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 26 }}>{group.icon}</span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: LIGHT.text,
                    fontFamily: LIGHT.fontFamily,
                  }}
                >
                  {group.title}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 13,
                      color: LIGHT.muted,
                      background: "rgba(37,99,235,0.06)",
                      border: `1px solid ${LIGHT.border}`,
                      borderRadius: 5,
                      padding: "4px 11px",
                      fontFamily: LIGHT.fontFamily,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
