# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A browser-based editor for **Fukuhara-style shinobue (Japanese bamboo flute) notation**. The user taps note/stroke/accidental/decoration/join buttons to build up a score, which renders as vertical, right-to-left columns and can be exported to JSON or a print-ready A4 PDF. Built with **Vite**; UI primitives come from `react-native-web` (`View`, `FlatList`, `SafeAreaView`, etc.) rather than raw DOM.

## Commands

- `npm start` (or `npm run dev`) — Vite dev server at http://localhost:3000
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm test` — Vitest watch mode. Single run: `npx vitest run`; single file: `npx vitest run src/App.test.js`; by name: `npx vitest run -t "name"`

## Toolchain notes (Vite + react-native-web)

This project was migrated from Create React App to Vite. Two non-obvious constraints follow from that and from react-native-web:

- **All JSX lives in `.js` files** (not `.jsx`). `vite.config.js` configures esbuild with `loader: 'jsx'` for `src/**/*.js` and the same in `optimizeDeps`. Don't rename files to `.jsx` expecting that to matter, and don't remove that esbuild config.
- **Assets are referenced as `new URL('../assets/x.png', import.meta.url).href`**, which yields a URL string (the old CRA `require('...png')` idiom). Code reads these as `glyph.source` (and `image.src = glyph.source` in `PDFScore.js`). Add new glyphs the same way — never `require()`.
- `react-native` is aliased to `react-native-web` and `.web.js` is a resolve extension, both in `vite.config.js`.
- Test setup: `environment: 'jsdom'`, `globals: true`, `setupFiles: ./src/setupTests.js` (loads `@testing-library/jest-dom`) — all under the `test` key in `vite.config.js`.

## Architecture

### The Score model (`src/model/Score.js`) is the heart of the app

`createScore({...})` is a **closure-based factory** (not a class) returning an object of accessor/mutator functions over private state: `lines`, each holding `marks`, plus a `currentLine` / `lineCursor` insertion point. There is no Redux/context store for document state — the score object *is* the state.

Key conventions to understand before touching anything:

- **Mutate-then-refresh rendering.** Mutators (`addNote`, `addStroke`, `deleteMark`, `newLine`, …) mutate the score in place and call the internal `postEdit()` hook. React re-renders via the `refresh` pattern below — not by replacing the model on every keystroke.
- **The `refresh` callback** (defined in `HomeScreen.js`) is threaded down through every view. Calling `refresh()` with no argument does `setScore(score.clone())`, producing a new object identity so React re-renders while preserving all the mutated content. `clone()` re-invokes `createScore` with the current private state. Views call `refresh()` after invoking a mutator.
- **Marks** are plain objects tagged with a `MarkType` (`Note`, `Stroke`, `Accidental`, `Decoration`, `Join`). Accidentals and decorations are **not** standalone marks in the line — they attach to the *previous* note (`previousMark().accidental`, `previousMark().decorations` Map). Toggling the same accidental/decoration removes it.
- **Lines have a `height`** (sum of mark heights; tall strokes have `relativeHeight` > 1). When a note would exceed `Config.maxLineLength`, a new line auto-wraps (only if the cursor is at the line end).
- **Joins** (arcs/ties spanning several notes) are derived, not stored per-segment: `processJoins()` re-walks the current line after every edit to recompute each mark's `joinPosition` (Start/Middle/End) and the start mark's `joinLength`. Don't hand-set join spans; set `join`/`joinChanged` and let `processJoins` reconcile.

### Mark catalog & glyphs (`src/data/ScoreLiterals.js`)

Single source of truth for every selectable mark: notes grouped by octave (`On` = Ryo / Kan / Daikan), accidentals (meri/kari), strokes, decorations, joins — each with a PNG `glyph` from `src/assets/`. It also builds a name→glyph `Map`; `getGlyph(markName)` is how both the on-screen renderer and the PDF exporter resolve images. Enums here are made by `createEnum` (`src/tools/Enum.js`), a frozen string-keyed object.

### Layout / responsive sizing (`src/data/Dimensions.js`)

All pixel sizing is centralised here, **not** in stylesheets. `Dimensions(window)` recomputes every button/mark/line/cursor dimension from the current window size and exposes `getXxxStyle()` getters. It's created in `App.js` from `useWindowDimensions()` and passed down through `DimensionsContext`. When something looks mis-sized, fix the math in this file rather than patching individual components. Static style structure lives in `src/styles/ScreenStyles.js`; `src/tools/DeepMerge.js` merges base styles with computed dimensions.

### View tree

`App` → `HomeScreen` (owns `score` state + `refresh`) → two siblings:
- **`ScoreView`** (`src/views/`) — read-only render of the score as an inverted horizontal `FlatList` of `Line` components (right-to-left columns); tapping a mark moves the cursor via `goto`. Auto-scrolls to the current line through the `onEdit` hook.
- **`InputView`** — the bamboo-textured input panel: title editor, `ScoreMarksSelectView` (note/stroke/accidental/decoration/join pickers), and `EditOperationsView` (delete, newline, upload, download, PDF, clear). Buttons are defined in `src/data/ButtonDefinitions.js` and rendered via reusable `ImageButton` / `RadioButtons` components.

`src/views/` = composite screens wiring model methods to UI; `src/components/` = reusable presentational pieces.

### Persistence & export

- **`src/tools/Persistence.js`** — `download`/`uploadJson` (browser Blob + file input; files are named `<title>.shinobue.json`) and custom `toJSON`/`fromJSON` that serialise/revive `Map` instances (decorations). `Score.serialise()` strips `id` fields on save; ids are regenerated with `nanoid` on load.
- **`src/model/PDFScore.js`** — `getPDFScore(score)` builds a jsPDF doc using a fixed A4 portrait layout, drawing the same glyphs (via `getGlyph`, cached as `Image` objects) in right-to-left columns with page breaks every `Config.linesPerPage` lines. This is a separate, parallel renderer from `ScoreView` — changes to how marks/joins/accidentals are positioned must be made in *both* places to keep screen and PDF in sync.

### Global tunables (`src/data/Config.js`)

`maxLineLength`, `linesPerPage`, `maxNotesLength`, highlight colour. These drive both wrapping logic and PDF pagination.