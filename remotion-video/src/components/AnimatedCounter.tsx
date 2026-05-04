import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { THEME } from "../theme";

interface AnimatedCounterProps {
  delay: number;
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  color?: string;
  labelColor?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  delay,
  target,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
  color,
  labelColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 40, stiffness: 80, mass: 1 },
  });

  const value = interpolate(progress, [0, 1], [0, target]);
  const displayed = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <div style={{ textAlign: "center", minWidth: 200 }}>
      <div
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: color ?? THEME.accentLight,
          fontFamily: THEME.fontFamily,
          lineHeight: 1,
          letterSpacing: "-2px",
        }}
      >
        {prefix}{displayed}{suffix}
      </div>
      <div
        style={{
          fontSize: 18,
          color: labelColor ?? THEME.muted,
          fontFamily: THEME.fontFamily,
          marginTop: 8,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
};
