import { useCurrentFrame } from "remotion";
import type { StyleId, ThemeOverrides } from "./content";

export type Theme = Required<Pick<ThemeOverrides, "fontFamily" | "codeFontFamily" | "speed" | "transition">> & {
  colors: Required<NonNullable<ThemeOverrides["colors"]>>;
  layout: Required<NonNullable<ThemeOverrides["layout"]>>;
};

const MONO = '"JetBrains Mono","Fira Code","DejaVu Sans Mono",Menlo,monospace';
const SANS = "Helvetica, Arial, sans-serif";

export const STYLE_PRESETS: Record<StyleId, Theme> = {
  whiteboard: {
    fontFamily: '"Segoe Print","Comic Neue","Comic Sans MS",cursive',
    codeFontFamily: MONO,
    speed: 1,
    transition: "fade",
    colors: {
      background: "#FDFCF8",
      surface: "#FFFFFF",
      text: "#1E1E24",
      muted: "#6B6B76",
      accent: "#1971C2",
      secondary: "#E03131",
      highlight: "#F08C00",
      captionBg: "rgba(30,30,36,0.9)",
      captionText: "#FFFFFF",
    },
    layout: { padding: 90, titleSize: 112, textSize: 72, captionSize: 46, captionBottom: 330 },
  },
  "animation-presenter": {
    fontFamily: SANS,
    codeFontFamily: MONO,
    speed: 1,
    transition: "slide",
    colors: {
      background: "#E7F5FF",
      surface: "#FFFFFF",
      text: "#14213D",
      muted: "#4A5A78",
      accent: "#FF6B35",
      secondary: "#1971C2",
      highlight: "#FFD43B",
      captionBg: "rgba(20,33,61,0.92)",
      captionText: "#FFFFFF",
    },
    layout: { padding: 80, titleSize: 108, textSize: 58, captionSize: 46, captionBottom: 330 },
  },
  "code-explainer": {
    fontFamily: SANS,
    codeFontFamily: MONO,
    speed: 1,
    transition: "fade",
    colors: {
      background: "#0D1117",
      surface: "#161B22",
      text: "#E6EDF3",
      muted: "#8B949E",
      accent: "#FF7B72",
      secondary: "#79C0FF",
      highlight: "#A5D6FF",
      captionBg: "rgba(1,4,9,0.92)",
      captionText: "#E6EDF3",
    },
    layout: { padding: 70, titleSize: 104, textSize: 64, captionSize: 44, captionBottom: 330 },
  },
};

/** Style preset with the content's overrides merged on top. */
export const resolveTheme = (style: StyleId, overrides: ThemeOverrides = {}): Theme => {
  const base = STYLE_PRESETS[style];
  return {
    fontFamily: overrides.fontFamily ?? base.fontFamily,
    codeFontFamily: overrides.codeFontFamily ?? base.codeFontFamily,
    speed: overrides.speed ?? base.speed,
    transition: overrides.transition ?? base.transition,
    colors: { ...base.colors, ...overrides.colors },
    layout: { ...base.layout, ...overrides.layout },
  };
};

/** Current frame scaled by theme.speed; drive all entrance animations from this. */
export const useAnimFrame = (theme: Theme): number => useCurrentFrame() * theme.speed;

/** Bottom inset scenes should respect so content never sits under the caption. */
export const safeBottom = (theme: Theme): number =>
  theme.layout.captionBottom + theme.layout.captionSize * 3.4;
