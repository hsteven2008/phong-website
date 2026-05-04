import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { FadeIn } from "../components/FadeIn";

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: "clamp" });

  const stats = [
    { delay: 20, target: 95, suffix: "%", label: "First-Contact Resolution" },
    { delay: 50, target: 200, suffix: "+", label: "Users Supported" },
    { delay: 80, target: 6, suffix: "", label: "CompTIA Certifications" },
    { delay: 110, target: 4, suffix: "", label: "Languages Spoken" },
  ];

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
        gap: 60,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${THEME.accent}, transparent)`,
        }}
      />

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
            marginBottom: 12,
          }}
        >
          By the numbers
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: THEME.white,
            fontFamily: THEME.fontFamily,
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
        }}
      >
        {stats.map((s) => (
          <FadeIn key={s.label} delay={s.delay} duration={18} translateY={20}>
            <AnimatedCounter
              delay={s.delay}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
