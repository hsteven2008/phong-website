import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";

const certs = [
  { name: "CompTIA A+",        desc: "Hardware & Software",       color: "#ef4444" },
  { name: "CompTIA Network+",  desc: "Networking Fundamentals",   color: "#f97316" },
  { name: "CompTIA Security+", desc: "Security Operations",       color: "#eab308" },
  { name: "CompTIA CIOS",      desc: "IT Operations Specialist",  color: "#22c55e" },
  { name: "CompTIA CSIS",      desc: "Secure Infrastructure",     color: "#06b6d4" },
  { name: "Linux Essentials",  desc: "Linux Fundamentals",        color: "#8b5cf6" },
];

export const Certs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

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
        padding: "60px 120px",
        boxSizing: "border-box",
        gap: 50,
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * exitOpacity,
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${LIGHT.grid} 1px, transparent 1px), linear-gradient(90deg, ${LIGHT.grid} 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

      <div style={{ opacity: titleOpacity, textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: LIGHT.accent, fontFamily: LIGHT.fontMono, marginBottom: 10 }}>Certifications</div>
        <div style={{ fontSize: 42, fontWeight: 700, color: LIGHT.text, fontFamily: LIGHT.fontFamily, letterSpacing: "-1px" }}>Stacked on the fundamentals.</div>
      </div>

      {/* 6 certs with 40-frame stagger — all visible before narrator finishes listing them */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, width: "100%", maxWidth: 1300, position: "relative", zIndex: 2 }}>
        {certs.map((cert, i) => {
          const certSpring = spring({ frame: frame - (15 + i * 40), fps, config: { damping: 28, stiffness: 70 } });

          return (
            <div
              key={cert.name}
              style={{
                opacity: certSpring,
                transform: `scale(${interpolate(certSpring, [0, 1], [0.88, 1])}) translateY(${interpolate(certSpring, [0, 1], [20, 0])}px)`,
                background: LIGHT.card,
                border: `1px solid ${LIGHT.border}`,
                borderRadius: 16,
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
                boxShadow: LIGHT.shadow,
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: cert.color, borderRadius: "16px 16px 0 0" }} />
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${cert.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 24 }}>🛡</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: LIGHT.text, fontFamily: LIGHT.fontFamily, marginBottom: 6 }}>{cert.name}</div>
              <div style={{ fontSize: 14, color: LIGHT.muted, fontFamily: LIGHT.fontFamily }}>{cert.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
