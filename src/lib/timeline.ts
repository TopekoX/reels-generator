import type { ReelContent } from "./content";

export type Timeline = {
  total: number;
  intro: { from: number; duration: number };
  points: { from: number; duration: number }[];
  outro: { from: number; duration: number };
};

const INTRO_SECONDS = 4;
const OUTRO_SECONDS = 4;

/** Splits the total duration into intro, equal-length point scenes, and outro. */
export const buildTimeline = (content: ReelContent, fps: number): Timeline => {
  const total = Math.round(content.durationSeconds * fps);
  const intro = Math.min(INTRO_SECONDS * fps, Math.floor(total / 3));
  const outro = Math.min(OUTRO_SECONDS * fps, Math.floor(total / 3));
  const middle = total - intro - outro;
  const count = content.points.length;
  const each = count > 0 ? Math.floor(middle / count) : 0;

  const points = content.points.map((_, i) => ({
    from: intro + i * each,
    // last scene absorbs rounding remainder so scenes tile the timeline exactly
    duration: i === count - 1 ? middle - each * (count - 1) : each,
  }));

  return {
    total,
    intro: { from: 0, duration: count > 0 ? intro : intro + middle },
    points,
    outro: { from: total - outro, duration: outro },
  };
};
