import { interpolate } from "remotion";
import { useAnimFrame, type Theme } from "../lib/theme";

/** High-contrast caption bar, placed above the Reels UI zone. */
export const Caption: React.FC<{ text: string; theme: Theme }> = ({ text, theme }) => {
  const frame = useAnimFrame(theme);
  const p = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const { captionSize, captionBottom, padding } = theme.layout;

  return (
    <div
      style={{
        position: "absolute",
        left: padding,
        right: padding,
        bottom: captionBottom,
        display: "flex",
        justifyContent: "center",
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: theme.colors.captionBg,
          color: theme.colors.captionText,
          fontFamily: theme.fontFamily,
          fontSize: captionSize,
          fontWeight: 700,
          lineHeight: 1.3,
          textAlign: "center",
          padding: "22px 36px",
          borderRadius: 24,
        }}
      >
        {text}
      </div>
    </div>
  );
};
