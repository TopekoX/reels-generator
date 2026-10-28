# Reels Generator

Local generator for vertical (1080×1920, 30 FPS) Indonesian educational videos. React + TypeScript + Remotion.

## Commands
- `npm run dev` — Remotion Studio preview
- `npm run render:whiteboard|presenter|code|all` — render the Docker examples to `out/`
- `npm run render` — render `content/default.json` with its own `style`
- `npm run typecheck` / `npm test` — must pass before claiming work is done

## Layout
- `content/default.json` — shared content schema (`style`, title, points, outro, `theme` overrides)
- `src/lib/` — schema + validation, theme presets/`resolveTheme`, `buildTimeline`, code tokenizer (pure, unit-tested)
- `src/components/` — reusable pieces; `StyledVideo` runs scenes, transitions, captions
- `src/styles/` — one `StyleDefinition` per style (whiteboard, animation-presenter, code-explainer)
- `public/assets/` — local images; missing images fall back to a placeholder

## Rules
- Through Phase 2 only: no database, dashboard, or social publishing APIs; keep dependencies minimal.
- Remotion packages are pinned to one exact version; keep them in sync.
- Only original or properly licensed assets; no copyrighted characters.
- Content language is Indonesian.
- `out/` is generated and git-ignored.
- Drive animations from `useAnimFrame(theme)` so `theme.speed` applies; keep text clear of the caption (`safeBottom`).
