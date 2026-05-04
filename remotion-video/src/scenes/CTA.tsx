import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { THEME } from "../theme";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // bgOpacity acts as the fade-in (starts at 0, reaches 1 by frame 22)
  const bgOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const nameSpring = spring({ frame: frame - 5, fps, config: { damping: 30, stiffness: 60 } });
  const lineSpring = spring({ frame: frame - 22, fps, config: { damping: 40, stiffness: 80 } });

  const emailOpacity    = interpolate(frame, [38, 56],   [0, 1], { extrapolateRight: "clamp" });
  const emailY          = interpolate(frame, [38, 56],   [16, 0], { extrapolateRight: "clamp" });
  const phoneOpacity    = interpolate(frame, [62, 80],   [0, 1], { extrapolateRight: "clamp" });
  const phoneY          = interpolate(frame, [62, 80],   [16, 0], { extrapolateRight: "clamp" });
  const linkedinOpacity = interpolate(frame, [86, 104],  [0, 1], { extrapolateRight: "clamp" });
  const linkedinY       = interpolate(frame, [86, 104],  [16, 0], { extrapolateRight: "clamp" });
  const taglineOpacity  = interpolate(frame, [115, 140], [0, 1], { extrapolateRight: "clamp" });

  const lineWidth = interpolate(lineSpring, [0, 1], [0, 480]);

  const exitOpacity = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        position: "relative",
        overflow: "hidden",
        opacity: bgOpacity * exitOpacity,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${THEME.accentGlow} 0%, transparent 65%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main content */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontSize: 20,
            color: THEME.muted,
            fontFamily: THEME.fontMono,
            letterSpacing: "0.1em",
            marginBottom: 20,
            opacity: nameSpring,
          }}
        >
          Let's connect.
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: THEME.white,
            fontFamily: THEME.fontFamily,
            letterSpacing: "-2px",
            lineHeight: 1,
            transform: `scale(${interpolate(nameSpring, [0, 1], [0.85, 1])})`,
            opacity: nameSpring,
          }}
        >
          Phong Hoang
        </div>

        {/* Animated line */}
        <div
          style={{
            height: 4,
            width: lineWidth,
            background: `linear-gradient(90deg, ${THEME.accent}, ${THEME.accentLight})`,
            borderRadius: 2,
            margin: "18px auto",
          }}
        />

        <div
          style={{
            fontSize: 22,
            color: THEME.accentLight,
            fontFamily: THEME.fontFamily,
            fontWeight: 500,
            opacity: nameSpring,
          }}
        >
          Cloud Support · IT Operations Engineer · Houston, TX
        </div>
      </div>

      {/* Contact cards — phone now first to match narration order */}
      <div style={{ display: "flex", gap: 20, position: "relative", zIndex: 2, marginTop: 10 }}>
        {[
          { icon: "✉",  label: "Email",    value: "hsteven2008@gmail.com",     opacity: emailOpacity,    y: emailY },
          { icon: "📞", label: "Phone",    value: "(832) 641-2959",            opacity: phoneOpacity,    y: phoneY },
          { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/pqhoang90", opacity: linkedinOpacity, y: linkedinY },
        ].map((c) => (
          <div
            key={c.label}
            style={{
              opacity: c.opacity,
              transform: `translateY(${c.y}px)`,
              background: THEME.bgCard,
              border: `1px solid ${THEME.border}`,
              borderRadius: 14,
              padding: "20px 28px",
              textAlign: "center",
              minWidth: 280,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
            <div
              style={{
                fontSize: 12,
                color: THEME.accent,
                fontFamily: THEME.fontMono,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              {c.label}
            </div>
            <div style={{ fontSize: 16, color: THEME.white, fontFamily: THEME.fontFamily, fontWeight: 500 }}>
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          fontSize: 16,
          color: THEME.muted,
          fontFamily: THEME.fontFamily,
          position: "relative",
          zIndex: 2,
          fontStyle: "italic",
        }}
      >
        Available now · Onsite or Hybrid · Houston metro
      </div>
    </div>
  );
};
