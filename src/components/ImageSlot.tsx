import { useState } from "react";
import { Img, staticFile } from "remotion";
import type { Theme } from "../lib/theme";

type Props = {
  /** Path relative to public/. Falls back to a placeholder if absent or unloadable. */
  src?: string;
  theme: Theme;
  width: number;
  height: number;
  style?: React.CSSProperties;
};

export const ImageSlot: React.FC<Props> = ({ src, theme, width, height, style }) => {
  const [failed, setFailed] = useState(false);
  const box: React.CSSProperties = {
    width,
    height,
    borderRadius: 28,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  if (!src || failed) {
    return (
      <div
        style={{
          ...box,
          border: `6px dashed ${theme.colors.muted}`,
          backgroundColor: `${theme.colors.muted}22`,
        }}
      >
        <svg width={width * 0.35} height={width * 0.35} viewBox="0 0 100 100" fill="none">
          <rect x="8" y="14" width="84" height="72" rx="10" stroke={theme.colors.muted} strokeWidth="6" />
          <circle cx="32" cy="38" r="9" fill={theme.colors.muted} />
          <path d="M12 80l26-28 18 18 14-12 20 22" stroke={theme.colors.muted} strokeWidth="6" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div style={box}>
      <Img
        src={staticFile(src)}
        maxRetries={0}
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
};
