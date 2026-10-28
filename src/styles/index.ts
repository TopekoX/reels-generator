import type { StyleDefinition } from "../components/StyledVideo";
import type { StyleId } from "../lib/content";
import { animationPresenter } from "./animationPresenter";
import { codeExplainer } from "./codeExplainer";
import { whiteboard } from "./whiteboard";

export const STYLES: Record<StyleId, StyleDefinition> = {
  whiteboard,
  "animation-presenter": animationPresenter,
  "code-explainer": codeExplainer,
};
