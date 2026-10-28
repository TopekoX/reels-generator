import { AbsoluteFill } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { CodeWindow } from "../components/CodeWindow";
import { ImageSlot } from "../components/ImageSlot";
import type { SceneProps, StyleDefinition } from "../components/StyledVideo";
import { safeBottom } from "../lib/theme";

const Background: StyleDefinition["Background"] = ({ theme }) => (
  <AbsoluteFill
    style={{
      backgroundColor: theme.colors.background,
      backgroundImage: `radial-gradient(${theme.colors.muted}33 2px, transparent 2px)`,
      backgroundSize: "48px 48px",
    }}
  />
);

const Intro: React.FC<SceneProps> = ({ content, theme }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 50, padding: theme.layout.padding }}>
    <CodeWindow code={`$ ${content.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} --help`} title="Terminal" theme={theme} width={940} fontSize={40} />
    <AnimatedText text={content.title} theme={theme} size={theme.layout.titleSize} mode="type" delay={30} color={theme.colors.text} />
    <AnimatedText text={content.subtitle} theme={theme} size={50} mode="type" delay={60} color={theme.colors.secondary} weight={600} />
  </AbsoluteFill>
);

const Point: React.FC<SceneProps> = ({ theme, point }) => (
  <AbsoluteFill
    style={{ justifyContent: "center", alignItems: "center", gap: 60, padding: theme.layout.padding, paddingBottom: safeBottom(theme) }}
  >
    <AnimatedText text={point!.text} theme={theme} size={theme.layout.textSize} mode="pop" align="left" />
    {point!.code ? (
      <CodeWindow code={point!.code} title={point!.codeTitle} theme={theme} width={940} />
    ) : (
      <ImageSlot src={point!.image} theme={theme} width={800} height={520} />
    )}
  </AbsoluteFill>
);

const Outro: React.FC<SceneProps> = ({ content, theme }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 50, padding: theme.layout.padding }}>
    <CodeWindow code={'echo "Sampai jumpa!"'} title="Terminal" theme={theme} width={940} fontSize={42} />
    <AnimatedText text={content.outro} theme={theme} size={80} mode="type" delay={30} color={theme.colors.accent} />
  </AbsoluteFill>
);

export const codeExplainer: StyleDefinition = { Background, Intro, Point, Outro };
