import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Theme } from "../lib/theme";

/** Fades (and optionally slides) a scene in at its start and out at its end. */
export const SceneTransition: React.FC<{ theme: Theme; children: React.ReactNode }> = ({ theme, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  if (theme.transition === "none") return <>{children}</>;

  const len = Math.max(1, Math.round(10 / theme.speed));
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const inP = interpolate(frame, [0, len], [0, 1], clamp);
  const outP = interpolate(frame, [durationInFrames - len, durationInFrames], [1, 0], clamp);
  const x = theme.transition === "slide" ? (1 - inP) * 160 - (1 - outP) * 160 : 0;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: Math.min(inP, outP), transform: `translateX(${x}px)` }}>
      {children}
    </div>
  );
};
