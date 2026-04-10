export const C = {
  bg: '#0c0a09',
  surface: '#1c1917',
  surfaceAlt: '#231f1d',
  border: '#292524',
  amber: '#fbbf24',
  amberLight: '#fde68a',
  amberDark: '#d97706',
  white: '#fafaf9',
  muted: '#a8a29e',
  dim: '#78716c',
  green: '#22c55e',
  red: '#ef4444',
  blue: '#60a5fa',
} as const;

export const W = 1080;
export const H = 1920;
export const FPS = 30;

// 씬별 프레임 수
export const SCENE_DURATIONS = {
  title: 90,       // 3s
  stats: 110,      // 3.7s
  comparison: 110, // 3.7s
  tips: 120,       // 4s
  caseStudy: 100,  // 3.3s
  quote: 100,      // 3.3s
  outro: 90,       // 3s
} as const;

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
// 720 frames = 24s
