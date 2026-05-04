export const THEME = {
  bg: "#0f172a",
  bgCard: "#1e293b",
  accent: "#2563eb",
  accentLight: "#60a5fa",
  accentGlow: "rgba(37, 99, 235, 0.35)",
  white: "#ffffff",
  muted: "#94a3b8",
  border: "rgba(96, 165, 250, 0.2)",
  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', 'Consolas', monospace",
};

// Light-background variant — used by Tagline, Stats, IronEdge, Skills, Certs, Languages
export const LIGHT = {
  bg: "#eef2ff",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#475569",
  accent: "#2563eb",
  accentText: "#1e40af",
  border: "rgba(37, 99, 235, 0.16)",
  shadow: "0 4px 20px rgba(0,0,0,0.07)",
  grid: "rgba(37,99,235,0.06)",
  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', 'Consolas', monospace",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene timing at 30fps — total 88s = 2640 frames
export const SCENES = {
  intro:     { start: 0,    duration: 120 },  // 0:00–0:04 (extended for name readability)
  tagline:   { start: 120,  duration: 150 },  // 0:04–0:09
  stats:     { start: 270,  duration: 360 },  // 0:09–0:21
  ironedge:  { start: 630,  duration: 420 },  // 0:21–0:35
  circulate: { start: 1050, duration: 360 },  // 0:35–0:47
  skills:    { start: 1410, duration: 360 },  // 0:47–0:59
  certs:     { start: 1770, duration: 240 },  // 0:59–1:07 (trimmed — no dead air)
  languages: { start: 2010, duration: 270 },  // 1:07–1:16
  cta:       { start: 2280, duration: 360 },  // 1:16–1:28
};

export const TOTAL_FRAMES = 2640; // 88 seconds
