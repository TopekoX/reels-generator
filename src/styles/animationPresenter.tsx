import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { ImageSlot } from "../components/ImageSlot";
import { PresenterAvatar } from "../components/PresenterAvatar";
import type { SceneProps, StyleDefinition } from "../components/StyledVideo";
import { safeBottom, useAnimFrame, type Theme } from "../lib/theme";

const Background: StyleDefinition["Background"] = ({ theme }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(170deg, ${theme.colors.background} 0%, ${theme.colors.highlight}55 100%)`,
    }}
  />
);

const Bubble: React.FC<{ theme: Theme; text: string }> = ({ theme, text }) => {
  const frame = useAnimFrame(theme);
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 4, fps, config: { damping: 12 } });
  return (
    <div
      style={{
        position: "relative",
        flex: 1,
        backgroundColor: theme.colors.surface,
        border: `6px solid ${theme.colors.text}`,
        borderRadius: 40,
        padding: "34px 40px",
        transform: `scale(${interpolate(p, [0, 1], [0.6, 1])})`,
        transformOrigin: "left bottom",
        opacity: p,
      }}
    >
      <AnimatedText text={text} theme={theme} size={theme.layout.textSize - 6} mode="pop" delay={8} align="left" weight={700} />
    </div>
  );
};

const Intro: React.FC<SceneProps> = ({ content, theme }) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: theme.layout.padding, paddingBottom: safeBottom(theme) - 100 }}
  >
    <AnimatedText text={content.title} theme={theme} size={theme.layout.titleSize} mode="pop" color={theme.colors.text} />
    <AnimatedText text={content.subtitle} theme={theme} size={52} mode="pop" delay={14} color={theme.colors.secondary} weight={600} />
    <ImageSlot src={content.introImage} theme={theme} width={620} height={380} />
    <PresenterAvatar theme={theme} size={520} />
  </AbsoluteFill>
);

const Point: React.FC<SceneProps> = ({ theme, point }) => (
  <AbsoluteFill style={{ padding: theme.layout.padding, paddingTop: 150, paddingBottom: safeBottom(theme), gap: 40, alignItems: "center" }}>
    <ImageSlot
      src={point!.image}
      theme={theme}
      width={900}
      height={500}
      style={{ backgroundColor: theme.colors.surface, border: `6px solid ${theme.colors.text}`, boxShadow: `0 20px 0 ${theme.colors.secondary}` }}
    />
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, width: "100%", marginTop: "auto" }}>
      <PresenterAvatar theme={theme} size={340} />
      <Bubble theme={theme} text={point!.text} />
    </div>
  </AbsoluteFill>
);

const Outro: React.FC<SceneProps> = ({ content, theme }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: theme.layout.padding }}>
    <PresenterAvatar theme={theme} size={560} />
    <AnimatedText text={content.outro} theme={theme} size={80} mode="pop" color={theme.colors.accent} />
  </AbsoluteFill>
);

export const animationPresenter: StyleDefinition = { Background, Intro, Point, Outro };
