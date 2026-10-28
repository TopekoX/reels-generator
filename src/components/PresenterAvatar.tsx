import { useAnimFrame, type Theme } from "../lib/theme";

/** Original, generic cartoon presenter. Mouth moves while `speaking`. */
export const PresenterAvatar: React.FC<{ theme: Theme; size?: number; speaking?: boolean }> = ({
  theme,
  size = 460,
  speaking = true,
}) => {
  const frame = useAnimFrame(theme);
  const bob = Math.sin(frame / 10) * 8;
  const mouth = speaking ? 4 + Math.abs(Math.sin(frame / 3)) * 9 : 3;
  const blink = frame % 90 > 85 ? 0.1 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: `translateY(${bob}px)` }}>
      <path d="M30 200c0-45 30-65 70-65s70 20 70 65z" fill={theme.colors.accent} />
      <rect x="88" y="112" width="24" height="28" rx="8" fill="#F2C9A0" />
      <path d="M52 84c0-34 20-52 48-52s48 18 48 52z" fill="#3B2A20" />
      <circle cx="100" cy="86" r="42" fill="#FFD8B5" />
      <path d="M58 76c10-26 30-34 46-34 20 0 34 12 40 34-20-12-52-18-86 0z" fill="#3B2A20" />
      <ellipse cx="84" cy="88" rx="5" ry={6 * blink} fill="#222" />
      <ellipse cx="116" cy="88" rx="5" ry={6 * blink} fill="#222" />
      <g fill="none" stroke="#222" strokeWidth="3">
        <circle cx="84" cy="88" r="13" />
        <circle cx="116" cy="88" r="13" />
        <line x1="97" y1="88" x2="103" y2="88" />
      </g>
      <ellipse cx="100" cy="112" rx="11" ry={mouth} fill="#8A2B2B" />
    </svg>
  );
};
