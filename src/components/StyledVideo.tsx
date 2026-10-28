import type { FC } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { VIDEO, type Point, type ReelContent } from "../lib/content";
import type { Theme } from "../lib/theme";
import { buildTimeline } from "../lib/timeline";
import { Caption } from "./Caption";
import { SceneTransition } from "./SceneTransition";

export type SceneProps = {
  content: ReelContent;
  theme: Theme;
  point?: Point;
  index?: number;
};

/** A visual style = a background plus three scene components. */
export type StyleDefinition = {
  Background: FC<{ theme: Theme }>;
  Intro: FC<SceneProps>;
  Point: FC<SceneProps>;
  Outro: FC<SceneProps>;
};

/** Lays out intro / point / outro scenes on the shared timeline, with transitions and captions. */
export const StyledVideo: FC<{ content: ReelContent; theme: Theme; definition: StyleDefinition }> = ({
  content,
  theme,
  definition: { Background, Intro, Point, Outro },
}) => {
  const tl = buildTimeline(content, VIDEO.fps);
  const common = { content, theme };

  return (
    <AbsoluteFill>
      <Background theme={theme} />
      <Sequence from={tl.intro.from} durationInFrames={tl.intro.duration}>
        <SceneTransition theme={theme}>
          <Intro {...common} />
        </SceneTransition>
      </Sequence>
      {content.points.map((point, index) => (
        <Sequence key={index} from={tl.points[index].from} durationInFrames={tl.points[index].duration}>
          <SceneTransition theme={theme}>
            <Point {...common} point={point} index={index} />
            {point.caption && <Caption text={point.caption} theme={theme} />}
          </SceneTransition>
        </Sequence>
      ))}
      <Sequence from={tl.outro.from} durationInFrames={tl.outro.duration}>
        <SceneTransition theme={theme}>
          <Outro {...common} />
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
