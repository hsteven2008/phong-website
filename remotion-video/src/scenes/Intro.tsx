import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { THEME } from "../theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameSpring = spring({ frame, fps, config: { damping: 30, stiffness: 60 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [20, 45], [20, 0], { extrapolateRight: "clamp" });

  const glowOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(nameSpring, [0, 1], [0, 320]);

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: glowOpacity,
        }}
      />

      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.accentGlow} 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowOpacity,
        }}
      />

      {/* Name */}
      <div
        style={{
          transform: `scale(${interpolate(nameSpring, [0, 1], [0.7, 1])})`,
          opacity: nameSpring,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: THEME.white,
            fontFamily: THEME.fontFamily,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          Phong Hoang
        </div>

        {/* Animated underline */}
        <div
          style={{
            height: 4,
            width: lineWidth,
            background: `linear-gradient(90deg, ${THEME.accent}, ${THEME.accentLight})`,
            borderRadius: 2,
            margin: "16px auto 0",
          }}
        />
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: 28,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: THEME.accentLight,
            fontFamily: THEME.fontFamily,
            letterSpacing: "0.02em",
          }}
        >
          Cloud Support · IT Operations Engineer
        </div>
        <div
          style={{
            fontSize: 18,
            color: THEME.muted,
            fontFamily: THEME.fontFamily,
            marginTop: 10,
            letterSpacing: "0.08em",
          }}
        >
          Houston, TX · Available Now
        </div>
      </div>
    </div>
  );
};
