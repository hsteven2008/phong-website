import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";

const words = ["Problem Solver.", "Builder.", "Reliable.", "Multilingual.", "Available Now."];

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();

  const wordsPerSlot = 18;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: THEME.bg,
        display: "flex",
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
        }}
      />

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: THEME.muted,
            fontFamily: THEME.fontMono,
            letterSpacing: "0.1em",
            marginBottom: 24,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          4+ years in IT. One word at a time.
        </div>

        <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {words.map((word, i) => {
            const start = i * wordsPerSlot;
            const end = start + wordsPerSlot;
            const opacity = interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const scale = interpolate(frame, [start, start + 8], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={word}
                style={{
                  position: "absolute",
                  opacity,
                  transform: `scale(${scale})`,
                  fontSize: 72,
                  fontWeight: 800,
                  color: THEME.accentLight,
                  fontFamily: THEME.fontFamily,
                  letterSpacing: "-2px",
                  whiteSpace: "nowrap",
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
