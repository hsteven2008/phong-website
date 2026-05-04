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

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene start frames (at 30fps, total ~80s = 2400 frames)
export const SCENES = {
  intro:      { start: 0,    duration: 90  },  // 0–3s
  tagline:    { start: 90,   duration: 90  },  // 3–6s
  stats:      { start: 180,  duration: 270 },  // 6–15s
  ironedge:   { start: 450,  duration: 360 },  // 15–27s
  circulate:  { start: 810,  duration: 330 },  // 27–38s
  skills:     { start: 1140, duration: 360 },  // 38–50s
  certs:      { start: 1500, duration: 330 },  // 50–61s
  languages:  { start: 1830, duration: 270 },  // 61–70s
  cta:        { start: 2100, duration: 300 },  // 70–80s
};

export const TOTAL_FRAMES = 2400; // 80 seconds
