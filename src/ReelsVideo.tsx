import { StyledVideo } from "./components/StyledVideo";
import { validateContent, type ReelContent } from "./lib/content";
import { resolveTheme } from "./lib/theme";
import { STYLES } from "./styles";

/** Renders `content` in the style named by `content.style`. */
export const ReelsVideo: React.FC<ReelContent> = (content) => {
  const errors = validateContent(content);
  if (errors.length > 0) throw new Error(`Invalid content:\n- ${errors.join("\n- ")}`);

  return <StyledVideo content={content} theme={resolveTheme(content.style, content.theme)} definition={STYLES[content.style]} />;
};
