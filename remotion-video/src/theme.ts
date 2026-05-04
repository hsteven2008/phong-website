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

// Scene boundaries derived directly from VTT audio timestamps (edge-tts AndrewNeural)
// Total audio: 128.749s = 3862 frames at 30fps
export const SCENES = {
  intro:     { start: 0,    duration: 281 },  // entries 1-2
  tagline:   { start: 281,  duration: 169 },  // entries 3-7
  stats:     { start: 450,  duration: 380 },  // entries 8-12
  ironedge:  { start: 830,  duration: 726 },  // entries 13-14
  circulate: { start: 1556, duration: 540 },  // entries 15-18
  skills:    { start: 2096, duration: 530 },  // entries 19-21
  certs:     { start: 2626, duration: 320 },  // entries 22-23
  languages: { start: 2946, duration: 371 },  // entries 24-25
  cta:       { start: 3317, duration: 545 },  // entries 26-28
};

export const TOTAL_FRAMES = 3862; // 128.749 seconds — matches audio exactly
