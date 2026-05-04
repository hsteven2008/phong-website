import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";

interface SubLine {
  from: number;
  to: number;
  text: string;
}

// Frame numbers derived DIRECTLY from edge-tts VTT timestamps (× 30fps).
// This guarantees subtitle text matches the narrator exactly.
const LINES: SubLine[] = [
  // Intro (frames 0–281)
  { from: 2,    to: 110,  text: "Most IT problems I touch get solved on the first call." },
  { from: 110,  to: 281,  text: "I'm Phong Hoang — Cloud Support & IT Operations Engineer, based in Houston." },

  // Tagline (frames 281–450) — matches cycling words on screen
  { from: 281,  to: 321,  text: "Problem solver." },
  { from: 321,  to: 346,  text: "Builder." },
  { from: 346,  to: 377,  text: "Reliable." },
  { from: 377,  to: 412,  text: "Multilingual." },
  { from: 412,  to: 450,  text: "Available now." },

  // Stats (frames 450–830)
  { from: 450,  to: 506,  text: "Four-plus years in IT." },
  { from: 506,  to: 640,  text: "The numbers: 95% first-contact resolution rate." },
  { from: 640,  to: 708,  text: "Over two hundred users supported." },
  { from: 708,  to: 776,  text: "Six CompTIA certifications." },
  { from: 776,  to: 830,  text: "And I speak four languages." },

  // IronEdge (frames 830–1556)
  { from: 830,  to: 1114, text: "At IronEdge Group — one of Houston's largest MSPs — I grew from Onboarding Tech to IT Support Technician in 15 months." },
  { from: 1114, to: 1340, text: "Managing AD & M365 for 100+ employees, handling 50+ tickets a week..." },
  { from: 1340, to: 1556, text: "...Tier-2 escalations: AD replication, VPN, firewall." },

  // CIRculate (frames 1556–2096)
  { from: 1556, to: 1734, text: "I wanted to see what I could build from scratch — so I joined CIRculate." },
  { from: 1734, to: 2007, text: "Built a full SaaS product in 60 days — Next.js on Vercel, Neon Postgres, Auth0, Stripe." },
  { from: 2007, to: 2055, text: "Zero to demo-ready." },
  { from: 2055, to: 2096, text: "Owned the whole stack." },

  // Skills (frames 2096–2626)
  { from: 2096, to: 2239, text: "My skills bridge traditional IT ops and modern cloud development." },
  { from: 2239, to: 2472, text: "IT operations: Active Directory, M365, ConnectWise, ImmyBot, networking." },
  { from: 2472, to: 2626, text: "Cloud-native: GitHub, Vercel, PowerShell, REST APIs." },

  // Certs (frames 2626–2946)
  { from: 2626, to: 2892, text: "Six CompTIA certifications — A+, Network+, Security+, CIOS, CSIS, Linux Essentials." },
  { from: 2892, to: 2946, text: "The fundamentals are solid." },

  // Languages (frames 2946–3317)
  { from: 2946, to: 3179, text: "I speak four languages: English and Vietnamese natively, Mandarin and Cantonese fluently." },
  { from: 3179, to: 3317, text: "For customer-facing roles or global teams, that's a real edge." },

  // CTA (frames 3317–3862)
  { from: 3317, to: 3441, text: "I'm available now, open to onsite or hybrid in Houston." },
  { from: 3441, to: 3636, text: "(832) 641-2959  ·  hsteven2008@gmail.com" },
  { from: 3636, to: 3832, text: "linkedin.com/in/pqhoang90" },
  { from: 3832, to: 3856, text: "Let's talk." },
];

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const activeLine = LINES.find((l) => frame >= l.from && frame <= l.to);
  if (!activeLine) return null;

  const opacity = interpolate(
    frame,
    [activeLine.from, activeLine.from + 6, activeLine.to - 6, activeLine.to],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 52,
        left: "50%",
        transform: "translateX(-50%)",
        width: "82%",
        maxWidth: 1300,
        textAlign: "center",
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "rgba(0,0,0,0.76)",
          color: "#ffffff",
          fontSize: 30,
          fontFamily: THEME.fontFamily,
          fontWeight: 500,
          borderRadius: 8,
          padding: "10px 26px",
          lineHeight: 1.45,
        }}
      >
        {activeLine.text}
      </div>
    </div>
  );
};
