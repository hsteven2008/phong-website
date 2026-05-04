import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LIGHT } from "../theme";

const words = ["Problem Solver.", "Builder.", "Reliable.", "Multilingual.", "Available Now."];

// Slot sizes derived from actual VTT timestamps (scene starts at global frame 281):
// "Problem solver."  281→321  = local  0→ 40  (40f)
// "Builder."         321→346  = local 40→ 65  (25f)
// "Reliable."        346→377  = local 65→ 96  (31f)
// "Multilingual."    377→412  = local 96→131  (35f)
// "Available Now."   412→450  = local131→169  (38f)
const wordTimings = [
  { start: 0,   end: 40  },
  { start: 40,  end: 65  },
  { start: 65,  end: 96  },
  { start: 96,  end: 131 },
  { start: 131, end: 169 },
];

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

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
            const { start, end } = wordTimings[i];
            const fadeLen = Math.min(7, Math.floor((end - start) * 0.25));
            const opacity = interpolate(
              frame,
              [start, start + fadeLen, end - fadeLen, end],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const scale = interpolate(frame, [start, start + fadeLen], [0.88, 1], {
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
