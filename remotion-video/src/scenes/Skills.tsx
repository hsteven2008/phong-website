import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FadeIn } from "../components/FadeIn";

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
  {
    title: "Creative Suite",
    icon: "🎨",
    items: ["Photoshop", "Illustrator", "InDesign", "Video Editing", "Animation"],
  },
  {
    title: "AI-Assisted Tooling",
    icon: "🤖",
    items: ["Claude Code", "GitHub Copilot", "ChatGPT", "Prompt engineering", "Code review"],
  },
];

export const Skills: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 18], [20, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: THEME.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px",
        boxSizing: "border-box",
        gap: 40,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: THEME.accent,
            fontFamily: THEME.fontMono,
            marginBottom: 10,
          }}
        >
          Skills
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: THEME.white,
            fontFamily: THEME.fontFamily,
            letterSpacing: "-1px",
          }}
        >
          What I work with.
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          width: "100%",
          maxWidth: 1500,
        }}
      >
        {skillGroups.map((group, gi) => (
          <FadeIn key={group.title} delay={20 + gi * 15} duration={18} translateY={20}>
            <div
              style={{
                background: THEME.bgCard,
                border: `1px solid ${THEME.border}`,
                borderRadius: 14,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 22 }}>{group.icon}</span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: THEME.white,
                    fontFamily: THEME.fontFamily,
                  }}
                >
                  {group.title}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12,
                      color: THEME.muted,
                      background: "rgba(148,163,184,0.08)",
                      border: "1px solid rgba(148,163,184,0.12)",
                      borderRadius: 5,
                      padding: "3px 9px",
                      fontFamily: THEME.fontFamily,
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
