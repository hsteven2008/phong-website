import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { FadeIn } from "../components/FadeIn";

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 22], [20, 0], { extrapolateRight: "clamp" });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 360 frames (12s) — 70-frame stagger gives each stat ~2.3s of solo visibility
  const stats = [
    { delay: 30,  target: 95,  suffix: "%", label: "First-Contact Resolution" },
    { delay: 100, target: 200, suffix: "+", label: "Users Supported" },
    { delay: 170, target: 6,   suffix: "",  label: "CompTIA Certifications" },
    { delay: 240, target: 4,   suffix: "",  label: "Languages Spoken" },
  ];

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
        gap: 60,
        position: "relative",
        overflow: "hidden",
        opacity: fadeIn * exitOpacity,
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${LIGHT.accent}, transparent)`,
        }}
      />

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
            marginBottom: 12,
          }}
        >
          By the numbers
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: LIGHT.text,
            fontFamily: LIGHT.fontFamily,
            letterSpacing: "-1px",
          }}
        >
          Results that speak for themselves.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
          position: "relative",
          zIndex: 2,
        }}
      >
        {stats.map((s) => (
          <FadeIn key={s.label} delay={s.delay} duration={20} translateY={20}>
            <AnimatedCounter
              delay={s.delay}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              color={LIGHT.accent}
              labelColor={LIGHT.muted}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
