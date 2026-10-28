import { describe, expect, it } from "vitest";
import { tokenizeLine } from "./code";

describe("tokenizeLine", () => {
  it("marks Dockerfile instructions as keywords", () => {
    expect(tokenizeLine("FROM node:22")[0]).toEqual({ text: "FROM", kind: "keyword" });
  });
  it("marks docker, flags and strings", () => {
    const kinds = tokenizeLine('docker run -p 80:80 "x y"').filter((t) => t.text.trim()).map((t) => t.kind);
    expect(kinds).toEqual(["keyword", "plain", "flag", "plain", "string"]);
  });
  it("treats # lines as comments and round-trips text", () => {
    expect(tokenizeLine("# hi")[0].kind).toBe("comment");
    const line = 'CMD ["node", "app.js"]';
    expect(tokenizeLine(line).map((t) => t.text).join("")).toBe(line);
  });
});
