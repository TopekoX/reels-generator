import { interpolate } from "remotion";
import { useAnimFrame, type Theme } from "../lib/theme";

/** Marker-style underline that draws itself. */
export const HandUnderline: React.FC<{ theme: Theme; width: number; color?: string; delay?: number }> = ({
  theme,
  width,
  color,
  delay = 10,
}) => {
  const frame = useAnimFrame(theme);
  const len = 400;
  const offset = interpolate(frame, [delay, delay + 20], [len, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg width={width} height={width * 0.07} viewBox="0 0 300 20" preserveAspectRatio="none">
      <path
        d="M4 12 C60 2, 110 18, 170 8 S260 14, 296 6"
        fill="none"
        stroke={color ?? theme.colors.secondary}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
