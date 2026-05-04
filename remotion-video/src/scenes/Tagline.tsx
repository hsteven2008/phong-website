import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";

const words = ["Problem Solver.", "Builder.", "Reliable.", "Multilingual.", "Available Now."];

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 150 frames total, 5 words × 30 frames each — 14 frames at full opacity per word
  const wordsPerSlot = 30;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const preambleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: LIGHT.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontSize: 22,
            color: LIGHT.muted,
            fontFamily: LIGHT.fontMono,
            letterSpacing: "0.1em",
            marginBottom: 24,
            opacity: preambleOpacity,
          }}
        >
          4+ years in IT. One word at a time.
        </div>

        <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {words.map((word, i) => {
            const start = i * wordsPerSlot;
            const end = start + wordsPerSlot;
            const opacity = interpolate(
              frame,
              [start, start + 8, end - 8, end],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const scale = interpolate(frame, [start, start + 8], [0.88, 1], {
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
                  fontSize: 80,
                  fontWeight: 800,
                  color: LIGHT.accentText,
                  fontFamily: LIGHT.fontFamily,
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
