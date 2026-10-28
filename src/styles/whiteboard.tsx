import { AbsoluteFill } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { HandUnderline } from "../components/HandUnderline";
import { ImageSlot } from "../components/ImageSlot";
import type { SceneProps, StyleDefinition } from "../components/StyledVideo";
import { safeBottom, useAnimFrame, type Theme } from "../lib/theme";

const column = (theme: Theme): React.CSSProperties => ({
  justifyContent: "center",
  alignItems: "center",
  padding: theme.layout.padding,
  paddingBottom: safeBottom(theme),
  gap: 50,
});

const sketchFrame = (theme: Theme, tilt: number): React.CSSProperties => ({
  backgroundColor: theme.colors.surface,
  border: `6px solid ${theme.colors.text}`,
  boxShadow: `10px 10px 0 ${theme.colors.text}`,
  transform: `rotate(${tilt}deg)`,
});

const Background: StyleDefinition["Background"] = ({ theme }) => (
  <AbsoluteFill
    style={{
      backgroundColor: theme.colors.background,
      backgroundImage: `linear-gradient(${theme.colors.muted}22 2px, transparent 2px), linear-gradient(90deg, ${theme.colors.muted}22 2px, transparent 2px)`,
      backgroundSize: "90px 90px",
    }}
  />
);

const Intro: React.FC<SceneProps> = ({ content, theme }) => (
  <AbsoluteFill style={column(theme)}>
    <ImageSlot src={content.introImage} theme={theme} width={620} height={460} style={sketchFrame(theme, -2)} />
    <AnimatedText text={content.title} theme={theme} size={theme.layout.titleSize} mode="wipe" color={theme.colors.text} />
    <HandUnderline theme={theme} width={720} />
    <AnimatedText text={content.subtitle} theme={theme} size={50} mode="wipe" delay={25} color={theme.colors.accent} weight={600} />
  </AbsoluteFill>
);

const Point: React.FC<SceneProps> = ({ content, theme, point, index = 0 }) => {
  const frame = useAnimFrame(theme);
  return (
    <AbsoluteFill style={column(theme)}>
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: 60,
          fontWeight: 800,
          color: theme.colors.surface,
          backgroundColor: theme.colors.accent,
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${Math.min(1, frame / 8)})`,
        }}
      >
        {index + 1}
      </div>
      <AnimatedText text={point!.text} theme={theme} size={theme.layout.textSize} mode="wipe" delay={6} />
      <ImageSlot src={point!.image} theme={theme} width={760} height={520} style={sketchFrame(theme, index % 2 ? 2 : -2)} />
    </AbsoluteFill>
  );
};

const Outro: React.FC<SceneProps> = ({ content, theme }) => (
  <AbsoluteFill style={{ ...column(theme), paddingBottom: theme.layout.padding }}>
    <AnimatedText text={content.outro} theme={theme} size={88} mode="wipe" color={theme.colors.accent} />
    <HandUnderline theme={theme} width={680} color={theme.colors.highlight} />
  </AbsoluteFill>
);

export const whiteboard: StyleDefinition = { Background, Intro, Point, Outro };
