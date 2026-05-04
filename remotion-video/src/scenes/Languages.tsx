import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";

const languages = [
  { lang: "English",    native: "English",    flag: "🇺🇸", level: "Native", color: "#3b82f6" },
  { lang: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳", level: "Native", color: "#ef4444" },
  { lang: "Mandarin",   native: "普通话",       flag: "🇨🇳", level: "Fluent", color: "#f59e0b" },
  { lang: "Cantonese",  native: "廣東話",       flag: "🇭🇰", level: "Fluent", color: "#10b981" },
];

export const Languages: React.FC = () => {
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
        gap: 50,
        padding: "60px 120px",
        boxSizing: "border-box",
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

      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: titleOpacity,
        }}
      />

      <div style={{ opacity: titleOpacity, textAlign: "center", position: "relative", zIndex: 2 }}>
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
          Languages
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: LIGHT.text,
            fontFamily: LIGHT.fontFamily,
            letterSpacing: "-1px",
            marginBottom: 8,
          }}
        >
          I speak your customer's language.
        </div>
        <div style={{ fontSize: 18, color: LIGHT.muted, fontFamily: LIGHT.fontFamily }}>
          A real differentiator for customer-facing support and global teams.
        </div>
      </div>

      <div style={{ display: "flex", gap: 28, position: "relative", zIndex: 2 }}>
        {languages.map((l, i) => {
          // 40-frame stagger — each card enters distinctly, Cantonese settles before 2nd subtitle line
          const cardSpring = spring({
            frame: frame - (15 + i * 40),
            fps,
            config: { damping: 25, stiffness: 65 },
          });

          return (
            <div
              key={l.lang}
              style={{
                opacity: cardSpring,
                transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.9, 1])})`,
                background: LIGHT.card,
                border: `1px solid ${l.color}55`,
                borderRadius: 20,
                padding: "36px 32px",
                textAlign: "center",
                minWidth: 220,
                position: "relative",
                overflow: "hidden",
                boxShadow: LIGHT.shadow,
              }}
            >
              {/* Color glow top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  background: `linear-gradient(180deg, ${l.color}18 0%, transparent 100%)`,
                }}
              />

              <div style={{ fontSize: 56, marginBottom: 14 }}>{l.flag}</div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: LIGHT.text,
                  fontFamily: LIGHT.fontFamily,
                  marginBottom: 4,
                }}
              >
                {l.lang}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: LIGHT.muted,
                  fontFamily: LIGHT.fontFamily,
                  marginBottom: 16,
                  fontStyle: "italic",
                }}
              >
                {l.native}
              </div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: l.color,
                  background: `${l.color}18`,
                  border: `1px solid ${l.color}44`,
                  borderRadius: 20,
                  padding: "4px 14px",
                  fontFamily: LIGHT.fontMono,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {l.level}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
