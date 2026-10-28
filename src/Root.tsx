import { Composition } from "remotion";
import defaultContent from "../content/default.json";
import { ReelsVideo } from "./ReelsVideo";
import { VIDEO, type ReelContent, type StyleId } from "./lib/content";

const content = defaultContent as ReelContent;

const common = {
  component: ReelsVideo,
  width: VIDEO.width,
  height: VIDEO.height,
  fps: VIDEO.fps,
  durationInFrames: Math.round(content.durationSeconds * VIDEO.fps),
  calculateMetadata: ({ props }: { props: ReelContent }) => ({
    durationInFrames: Math.round(props.durationSeconds * VIDEO.fps),
  }),
};

/** Same Docker content, one composition per style. */
const EXAMPLES: { id: string; style: StyleId }[] = [
  { id: "DockerWhiteboard", style: "whiteboard" },
  { id: "DockerPresenter", style: "animation-presenter" },
  { id: "DockerCode", style: "code-explainer" },
];

export const Root: React.FC = () => (
  <>
    {/* Style comes from content/default.json (or --props). */}
    <Composition id="ReelsVideo" {...common} defaultProps={content} />
    {EXAMPLES.map(({ id, style }) => (
      <Composition key={id} id={id} {...common} defaultProps={{ ...content, style }} />
    ))}
  </>
);
