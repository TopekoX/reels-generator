export const VIDEO = { width: 1080, height: 1920, fps: 30 } as const;

export const STYLE_IDS = ["whiteboard", "animation-presenter", "code-explainer"] as const;
export type StyleId = (typeof STYLE_IDS)[number];

export type Point = {
  /** Headline shown in the scene. */
  text: string;
  /** Short readable caption shown at the bottom (optional). */
  caption?: string;
  /** Path relative to public/, e.g. "assets/container.svg". Placeholder is shown when missing. */
  image?: string;
  /** Code or command shown by the code-explainer style. */
  code?: string;
  /** Window title for the code block, e.g. "Dockerfile". */
  codeTitle?: string;
};

export type ThemeOverrides = {
  fontFamily?: string;
  codeFontFamily?: string;
  /** Animation speed multiplier; 1 = default, 2 = twice as fast. */
  speed?: number;
  transition?: "fade" | "slide" | "none";
  colors?: Partial<{
    background: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
    secondary: string;
    highlight: string;
    captionBg: string;
    captionText: string;
  }>;
  layout?: Partial<{
    padding: number;
    titleSize: number;
    textSize: number;
    captionSize: number;
    /** Distance of the caption from the bottom edge (keeps clear of Reels UI). */
    captionBottom: number;
  }>;
};

export type ReelContent = {
  style: StyleId;
  title: string;
  subtitle: string;
  /** Optional image for the intro scene (path relative to public/). */
  introImage?: string;
  points: Point[];
  outro: string;
  durationSeconds: number;
  theme?: ThemeOverrides;
};

/** Returns a list of human-readable problems; empty when the content is valid. */
export const validateContent = (c: ReelContent): string[] => {
  const errors: string[] = [];
  if (!STYLE_IDS.includes(c.style)) {
    errors.push(`style "${c.style}" is unknown; use one of: ${STYLE_IDS.join(", ")}`);
  }
  if (!c.title?.trim()) errors.push("title is required");
  if (!(c.durationSeconds >= 6)) errors.push("durationSeconds must be at least 6");
  if (!Array.isArray(c.points) || c.points.length === 0) errors.push("points needs at least one entry");
  c.points?.forEach((p, i) => {
    if (!p?.text?.trim()) errors.push(`points[${i}].text is required`);
  });
  if (c.theme?.speed !== undefined && !(c.theme.speed > 0)) errors.push("theme.speed must be > 0");
  return errors;
};
