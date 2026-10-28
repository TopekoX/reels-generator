import { describe, expect, it } from "vitest";
import type { ReelContent } from "./content";
import { buildTimeline } from "./timeline";

const base: ReelContent = {
  style: "whiteboard",
  title: "t",
  subtitle: "s",
  points: [{ text: "a" }, { text: "b" }, { text: "c" }, { text: "d" }],
  outro: "o",
  durationSeconds: 30,
};

describe("buildTimeline", () => {
  it("defaults to 900 frames at 30fps for 30 seconds", () => {
    expect(buildTimeline(base, 30).total).toBe(900);
  });

  it("tiles scenes contiguously with no gaps or overlaps", () => {
    for (const n of [0, 1, 3, 4, 7]) {
      const tl = buildTimeline({ ...base, points: Array.from({ length: n }, () => ({ text: "x" })) }, 30);
      const scenes = [tl.intro, ...tl.points, tl.outro];
      let cursor = 0;
      for (const s of scenes) {
        expect(s.from).toBe(cursor);
        expect(s.duration).toBeGreaterThan(0);
        cursor += s.duration;
      }
      expect(cursor).toBe(tl.total);
    }
  });

  it("scales with durationSeconds", () => {
    expect(buildTimeline({ ...base, durationSeconds: 15 }, 30).total).toBe(450);
  });
});
