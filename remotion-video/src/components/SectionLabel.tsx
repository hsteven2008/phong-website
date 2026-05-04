import React from "react";
import { THEME } from "../theme";

interface SectionLabelProps {
  children: React.ReactNode;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => (
  <div
    style={{
      display: "inline-block",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: THEME.accent,
      fontFamily: THEME.fontMono,
      background: "rgba(37,99,235,0.12)",
      border: `1px solid ${THEME.border}`,
      borderRadius: 4,
      padding: "4px 12px",
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);
