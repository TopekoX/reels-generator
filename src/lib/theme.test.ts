import { describe, expect, it } from "vitest";
import { STYLE_IDS } from "./content";
import { resolveTheme, STYLE_PRESETS } from "./theme";

describe("resolveTheme", () => {
  it("has a preset for every style", () => {
    for (const id of STYLE_IDS) expect(resolveTheme(id)).toEqual(STYLE_PRESETS[id]);
  });
  it("merges partial overrides without losing defaults", () => {
    const t = resolveTheme("whiteboard", { speed: 2, colors: { accent: "#000" }, layout: { titleSize: 50 } });
    expect(t.speed).toBe(2);
    expect(t.colors.accent).toBe("#000");
    expect(t.colors.background).toBe(STYLE_PRESETS.whiteboard.colors.background);
    expect(t.layout.titleSize).toBe(50);
    expect(t.layout.textSize).toBe(STYLE_PRESETS.whiteboard.layout.textSize);
  });
  it("does not mutate presets", () => {
    resolveTheme("code-explainer", { colors: { accent: "#fff" } });
    expect(STYLE_PRESETS["code-explainer"].colors.accent).toBe("#FF7B72");
  });
});
