import { tokenizeLine, type TokenKind } from "../lib/code";
import { useAnimFrame, type Theme } from "../lib/theme";

type Props = { code: string; title?: string; theme: Theme; width: number; fontSize?: number; delay?: number };

/** Editor-style window with a typewriter code reveal and simple highlighting. */
export const CodeWindow: React.FC<Props> = ({ code, title = "Terminal", theme, width, fontSize = 46, delay = 8 }) => {
  const frame = useAnimFrame(theme);
  const typed = Math.floor(Math.max(0, frame - delay) * 1.6);
  const colorOf: Record<TokenKind, string> = {
    keyword: theme.colors.accent,
    flag: theme.colors.secondary,
    string: theme.colors.highlight,
    comment: theme.colors.muted,
    plain: theme.colors.text,
  };

  let remaining = typed;
  const lines = code.split("\n").map((line) => {
    const shown = line.slice(0, Math.max(0, remaining));
    remaining -= line.length + 1;
    return { shown };
  });
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const lastLine = lines.reduce((acc, l, i) => (l.shown.length > 0 || i === 0 ? i : acc), 0);

  return (
    <div
      style={{
        width,
        borderRadius: 28,
        overflow: "hidden",
        backgroundColor: theme.colors.surface,
        border: `3px solid ${theme.colors.muted}55`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 28px", backgroundColor: `${theme.colors.muted}22` }}>
        {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
          <span key={c} style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: c }} />
        ))}
        <span style={{ marginLeft: 16, fontFamily: theme.codeFontFamily, fontSize: 30, color: theme.colors.muted }}>{title}</span>
      </div>
      <div style={{ padding: "36px 36px 44px", fontFamily: theme.codeFontFamily, fontSize, lineHeight: 1.5, minHeight: fontSize * 1.5 * Math.max(code.split("\n").length, 2) }}>
        {lines.map((l, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", minHeight: fontSize * 1.5 }}>
            {tokenizeLine(l.shown).map((t, j) => (
              <span key={j} style={{ color: colorOf[t.kind] }}>{t.text}</span>
            ))}
            {i === lastLine && caretOn && <span style={{ color: theme.colors.text }}>▌</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
