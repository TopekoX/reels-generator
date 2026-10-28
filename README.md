# Reels Generator

Generates vertical (1080×1920, 30 FPS) Indonesian educational videos with Remotion. Phase 2 adds three reusable visual styles that share one content schema.

## Setup
Requires Node.js 20+.

```bash
npm install
```
Remotion downloads a headless Chrome on first preview/render.

## Preview
```bash
npm run dev
```
Remotion Studio lists these compositions:

| Composition | Style | Source |
|---|---|---|
| `ReelsVideo` | whatever `style` says | `content/default.json` |
| `DockerWhiteboard` | `whiteboard` | Docker example |
| `DockerPresenter` | `animation-presenter` | Docker example |
| `DockerCode` | `code-explainer` | Docker example |

## Render
```bash
npm run render:whiteboard   # out/docker-whiteboard.mp4
npm run render:presenter    # out/docker-presenter.mp4
npm run render:code         # out/docker-code.mp4
npm run render:all          # all three
npm run render              # out/reel.mp4 using content/default.json as-is
npm run still               # one PNG per example style in out/
```

## Selecting a style
Set `style` in your content file to `whiteboard`, `animation-presenter`, or `code-explainer`:

```bash
# edit "style" in content/default.json, then:
npm run render

# or override on the command line (merged over default.json)
npx remotion render src/index.ts ReelsVideo out/x.mp4 --props='{"style":"code-explainer"}'

# or use your own content file
npx remotion render src/index.ts ReelsVideo out/x.mp4 --props=path/to/content.json
```
An unknown style or invalid content fails fast with a readable error.

## Content schema
All styles read the same file (`content/default.json`):

| field | meaning |
|---|---|
| `style` | one of the three style ids |
| `title`, `subtitle` | intro scene |
| `introImage` | optional image for the intro |
| `points[]` | one scene each: `text` (required), `caption`, `image`, `code`, `codeTitle` |
| `outro` | closing text |
| `durationSeconds` | total length; intro and outro get 4 s each, points share the rest |
| `theme` | optional overrides, see below |

Each style uses what it needs: `image` for whiteboard and presenter, `code` for code-explainer (which falls back to `image`). `caption` appears as a bar near the bottom, above the Reels UI zone, in every style.

## Customising look and feel
Each style has defaults in `src/lib/theme.ts`; override any part per video with `theme`:

```json
"theme": {
  "fontFamily": "Georgia, serif",
  "speed": 1.5,
  "transition": "slide",
  "colors": { "accent": "#7048E8", "background": "#FFF9DB" },
  "layout": { "titleSize": 96, "captionSize": 52, "captionBottom": 360 }
}
```
- `speed` — animation speed multiplier (2 = twice as fast)
- `transition` — `fade`, `slide`, or `none`
- `colors` — `background surface text muted accent secondary highlight captionBg captionText`
- `layout` — `padding titleSize textSize captionSize captionBottom`
- `fontFamily`, `codeFontFamily` — use fonts installed on the machine

## Replacing assets
1. Put image files (PNG, JPG, SVG, WebP) in `public/assets/`.
2. Reference them relative to `public/`: `"image": "assets/my-diagram.png"`.
3. A point with no `image`, or one whose file can't be loaded, shows a neutral placeholder instead of failing.

The bundled `container.svg` and `laptop.svg` are original illustrations; the presenter character is an original SVG. Use only assets you have the right to use.

## Adding a style
Create a `StyleDefinition` (`Background`, `Intro`, `Point`, `Outro`) in `src/styles/`, register it in `src/styles/index.ts`, add its id to `STYLE_IDS` in `src/lib/content.ts` and a preset in `src/lib/theme.ts`. Transitions, captions, and timing come from `StyledVideo`.

## Checks
```bash
npm run typecheck
npm test
```

## Structure
`src/lib` (schema, theme, timeline, code tokenizer) · `src/components` (AnimatedText, ImageSlot, Caption, SceneTransition, CodeWindow, PresenterAvatar, HandUnderline, StyledVideo) · `src/styles` (one file per style) · `src/ReelsVideo.tsx` · `src/Root.tsx`
