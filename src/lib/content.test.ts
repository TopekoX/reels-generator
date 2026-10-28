import { describe, expect, it } from "vitest";
import docker from "../../content/default.json";
import { STYLE_IDS, validateContent, type ReelContent } from "./content";

const base = docker as ReelContent;

describe("validateContent", () => {
  it("accepts the Docker example in every style", () => {
    for (const style of STYLE_IDS) expect(validateContent({ ...base, style })).toEqual([]);
  });
  it("reports unknown style, empty points and bad speed", () => {
    const errors = validateContent({
      ...base,
      style: "nope" as ReelContent["style"],
      points: [],
      theme: { speed: 0 },
    });
    expect(errors.length).toBe(3);
  });
  it("reports empty point text with its index", () => {
    expect(validateContent({ ...base, points: [{ text: " " }] })).toEqual(["points[0].text is required"]);
  });
});
