import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../theme";

interface SubLine {
  from: number;
  to: number;
  text: string;
}

// Absolute frame numbers (30fps). Must match narration script timing.
// Scene starts: intro=0, tagline=120, stats=270, ironedge=630, circulate=1050,
//               skills=1410, certs=1770, languages=2010, cta=2280
const LINES: SubLine[] = [
  // Intro (frames 0–120) — hook first, then name
  { from: 8,    to: 72,   text: "Most IT problems I touch get solved on the first call." },
  { from: 77,   to: 114,  text: "I'm Phong Hoang — Cloud Support & IT Operations Engineer, Houston TX." },

  // Tagline (frames 120–270) — matches words cycling on screen
  { from: 123,  to: 148,  text: "Problem solver." },
  { from: 153,  to: 178,  text: "Builder." },
  { from: 183,  to: 208,  text: "Reliable." },
  { from: 213,  to: 238,  text: "Multilingual." },
  { from: 243,  to: 268,  text: "Available now." },

  // Stats (frames 270–630)
  { from: 278,  to: 375,  text: "Four-plus years in IT. The numbers." },
  { from: 380,  to: 480,  text: "95% first-contact resolution. Over 200 users supported." },
  { from: 485,  to: 622,  text: "Six CompTIA certifications. And I speak four languages." },

  // IronEdge (frames 630–1050)
  { from: 638,  to: 760,  text: "At IronEdge Group — one of Houston's largest MSPs — I grew from Onboarding Tech to IT Support Tech in 15 months." },
  { from: 765,  to: 880,  text: "Managing AD & M365 for 100+ employees, 50+ tickets a week." },
  { from: 885,  to: 1000, text: "95% first-contact resolution. Tier-2 escalations: AD replication, VPN, firewall." },

  // CIRculate (frames 1050–1410) — bridge sentence leads the scene
  { from: 1058, to: 1145, text: "I wanted to see what I could build from scratch — so I joined CIRculate." },
  { from: 1150, to: 1270, text: "Built a full SaaS product in 60 days — Next.js, Vercel, Neon Postgres, Auth0, Stripe." },
  { from: 1275, to: 1405, text: "Zero to demo-ready. Owned the whole stack." },

  // Skills (frames 1410–1770) — updated opener names both worlds explicitly
  { from: 1418, to: 1520, text: "My skills bridge traditional IT ops and modern cloud development." },
  { from: 1525, to: 1640, text: "IT ops: Active Directory, M365, ConnectWise, ImmyBot, networking." },
  { from: 1645, to: 1762, text: "Cloud-native: GitHub, Vercel, PowerShell, REST APIs." },

  // Certs (frames 1770–2010) — trimmed scene, no dead air
  { from: 1778, to: 1895, text: "Six CompTIA certs — A+, Network+, Security+, CIOS, CSIS, Linux Essentials." },
  { from: 1900, to: 2002, text: "The fundamentals are solid." },

  // Languages (frames 2010–2280)
  { from: 2018, to: 2140, text: "I speak four languages — English and Vietnamese natively, Mandarin and Cantonese fluently." },
  { from: 2145, to: 2272, text: "For customer-facing roles or global teams, that's a real edge." },

  // CTA (frames 2280–2640) — phone number now mentioned to match on-screen card
  { from: 2288, to: 2390, text: "I'm available now — open to onsite or hybrid in Houston." },
  { from: 2395, to: 2515, text: "(832) 641-2959  ·  hsteven2008@gmail.com  ·  LinkedIn: pqhoang90" },
  { from: 2520, to: 2630, text: "Let's talk." },
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
