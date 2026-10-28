import { interpolate, spring, useVideoConfig } from "remotion";
import { useAnimFrame, type Theme } from "../lib/theme";

type Props = {
  text: string;
  theme: Theme;
  size: number;
  /** pop: words spring in · wipe: left-to-right reveal · type: typewriter */
  mode?: "pop" | "wipe" | "type";
  color?: string;
  delay?: number;
  weight?: number;
  align?: "left" | "center";
  fontFamily?: string;
};

export const AnimatedText: React.FC<Props> = ({
  text,
  theme,
  size,
  mode = "pop",
  color,
  delay = 0,
  weight = 800,
  align = "center",
  fontFamily,
}) => {
  const frame = useAnimFrame(theme);
  const { fps } = useVideoConfig();
  const base: React.CSSProperties = {
    fontFamily: fontFamily ?? theme.fontFamily,
    fontSize: size,
    fontWeight: weight,
    color: color ?? theme.colors.text,
    textAlign: align,
    lineHeight: 1.25,
  };

  if (mode === "type") {
    const n = Math.floor(Math.max(0, frame - delay) * 1.2);
    return <div style={{ ...base, whiteSpace: "pre-wrap" }}>{text.slice(0, n)}</div>;
  }

  if (mode === "wipe") {
    const end = delay + Math.min(45, 10 + text.length * 0.6);
    const pct = interpolate(frame, [delay, end], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return <div style={{ ...base, clipPath: `inset(-10% ${100 - pct}% -10% 0)` }}>{text}</div>;
  }

  return (
    <div
      style={{
        ...base,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: `0 ${size * 0.25}px`,
      }}
    >
      {text.split(" ").map((word, i) => {
        const p = spring({
          frame: frame - delay - i * 3,
          fps,
          config: { damping: 14, stiffness: 120 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [50, 0])}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
