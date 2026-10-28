export type TokenKind = "keyword" | "flag" | "string" | "comment" | "plain";
export type Token = { text: string; kind: TokenKind };

/** Tiny shell/Dockerfile-flavoured tokenizer; enough for readable highlighting. */
export const tokenizeLine = (line: string): Token[] => {
  if (line.trimStart().startsWith("#")) return [{ text: line, kind: "comment" }];
  const parts = line.match(/\s+|"[^"]*"?|[^\s"]+/g) ?? [];
  let seenWord = false;
  return parts.map((text) => {
    if (/^\s+$/.test(text)) return { text, kind: "plain" };
    const first = !seenWord;
    seenWord = true;
    if (text.startsWith('"')) return { text, kind: "string" };
    if (text.startsWith("-")) return { text, kind: "flag" };
    if (first && (/^[A-Z]{2,}$/.test(text) || text === "docker")) return { text, kind: "keyword" };
    return { text, kind: "plain" };
  });
};
