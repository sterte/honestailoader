# HonestAILoader

> A silly proof-of-concept built to get hands-on with [Claude Code](https://claude.ai/code) and the [Anthropic Console](https://console.anthropic.com). The entire project — component, dictionaries, demo, and this README — was written through a conversation with Claude. The "honest" part refers to the loading phrases, which say what AI is actually doing to the world instead of the usual "Almost there…"

---

## What it is

A configurable React loading component that combines an animated graphic (spinning circle or progress bar) with rotating, localized phrases sampled from thematic dictionaries. Built-in dictionaries cover seven categories — environment, work, society, power, data, cinema, and pop-culture quotes — all in English and Italian, all uncomfortably accurate.

You can mix dictionaries, weight them, add your own, and tune every visual aspect.

---

## Installation

### From npm

```bash
npm install honest-ai-loader
```

Then import the component and its stylesheet:

```tsx
import { HonestAILoader } from 'honest-ai-loader';
import 'honest-ai-loader/style.css';
```

> **The CSS import is required.** The component uses CSS Modules; the styles are shipped as a separate file in the package.

### Run the demo locally

```bash
git clone https://github.com/sterte/honestailoader.git
cd honestailoader
npm install
npm run dev
```

Requires **Node 18+** (developed on Node 22). Vite 5 will refuse older versions.

---

## Quick example

```tsx
import { HonestAILoader } from 'honest-ai-loader';
import 'honest-ai-loader/style.css';

// Minimal — spinning circle, English environment phrases
<HonestAILoader />

// Determinate linear bar, Italian, two dictionaries weighted unevenly
<HonestAILoader
  type="linear"
  loop={false}
  advancement={0.65}
  language="it"
  dictionaries={['work', 'society']}
  dictionaryProbabilities={[3, 1]}
/>

// Text overlaid on top of the graphic, custom colours
<HonestAILoader
  textPosition="over"
  styleOptions={{
    primaryColor: '#ef4444',
    secondaryColor: '#fecaca',
    textColor: '#1f2937',
    fontSize: '0.75rem',
    fontWeight: 600,
  }}
/>

// Custom dictionary only
const myDict = {
  language: 'en',
  categories: [{ category: 'startup', values: ['Disrupting disruption...', 'Pivoting the pivot...'] }],
};

<HonestAILoader
  dictionaries={[]}
  customDictionaries={myDict}
/>
```

---

## API

### `<HonestAILoader />`

All props are optional.

#### Graphic props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showGraphic` | `boolean` | `true` | Render the animated graphic |
| `type` | `'circle' \| 'linear'` | `'circle'` | Shape of the graphic |
| `loop` | `boolean` | `true` | `true` = indeterminate spinner; `false` = determinate progress |
| `advancement` | `number` | `0` | Progress value `0..1`, used when `loop=false`. Clamped silently |

#### Text props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showText` | `boolean` | `true` | Render the cycling phrase |
| `language` | `string` | `'en'` | BCP 47 language tag. Only dictionaries matching this tag are used |
| `dictionaries` | `BuiltInDictionaryKey[]` | `['environment']` | Built-in dictionary keys to sample from |
| `customDictionaries` | `Dictionary \| Dictionary[]` | — | Extra dictionaries added to the pool |
| `dictionaryProbabilities` | `number[]` | — | Unnormalized weights for each entry in `dictionaries` |
| `customDictionaryProbabilities` | `number[]` | — | Unnormalized weights for each entry in `customDictionaries` |
| `textTime` | `number` | `3000` | Milliseconds each phrase stays fully visible |
| `textTransition` | `'fade' \| 'scroll'` | `'fade'` | Transition animation between phrases |
| `transitionTime` | `number` | `300` | Milliseconds for the in/out transition animation |
| `textPosition` | `TextPosition` | `'bottom'` | Where the text sits relative to the graphic (see below) |
| `styleOptions` | `StyleOptions` | — | Visual overrides for colours, sizes, and font (see below) |

#### `textPosition` values

| Value | Effect |
|-------|--------|
| `'bottom'` | Text below graphic (default) |
| `'top'` | Text above graphic |
| `'left'` | Text left of graphic |
| `'right'` | Text right of graphic |
| `'over'` | Text centered on top of graphic (higher z-index) |
| `'under'` | Text centered behind graphic (lower z-index) |

---

### `StyleOptions`

All fields are optional.

#### Graphic

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `primaryColor` | `string` | `#6366f1` | Animated arc / bar fill colour |
| `secondaryColor` | `string` | `#e5e7eb` | Track / background colour |
| `size` | `number` | `100` (circle) / `240` (linear) | Circle diameter or bar width in px |
| `strokeWidth` | `number` | `6` | Circle stroke thickness in px (circle only) |
| `barHeight` | `number` | `8` | Bar height in px (linear only) |

#### Text

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `textColor` | `string` | `#6b7280` | Phrase text colour |
| `fontSize` | `string` | `'0.9rem'` | CSS font-size value |
| `fontWeight` | `number \| string` | `400` | CSS font-weight |
| `fontFamily` | `string` | inherits | CSS font-family |
| `letterSpacing` | `string` | normal | CSS letter-spacing |
| `lineHeight` | `number \| string` | `1.5` | CSS line-height |

---

### `Dictionary` shape

Use this to pass custom phrase sets via `customDictionaries`.

```ts
interface DictionaryCategory {
  category: string;   // label (unused by the sampler, for your reference)
  values: string[];   // the phrases
}

interface Dictionary {
  language: string;         // BCP 47 tag, e.g. "en", "it", "fr"
  categories: DictionaryCategory[];
}
```

If the active `language` does not match a dictionary's `language` field, that dictionary is silently excluded and its weight is redistributed.

---

### Built-in dictionaries

| Key | Theme |
|-----|-------|
| `'environment'` | Climate, pollution, resource depletion |
| `'work'` | Automation, precarious labour, gig economy |
| `'society'` | Surveillance, social fragmentation, misinformation |
| `'power'` | Big tech, monopolies, regulatory capture |
| `'data'` | Privacy, training data, consent |
| `'quotes'` | References to sci-fi AI classics (2001, Terminator, Matrix, Her, Foundation…) |
| `'cinema'` | What AI is doing to the film industry |

All dictionaries are available in `'en'` and `'it'`.

---

### Phrase sampling

Phrases are sampled at each text cycle using weighted random selection:

1. Active dictionaries (those matching `language`) are collected.
2. Weights from `dictionaryProbabilities` / `customDictionaryProbabilities` are normalized to sum to 1. Missing weights default to `1`.
3. A dictionary is chosen by weight, then a category within it uniformly, then a phrase uniformly.
4. A simple 5-attempt heuristic avoids repeating the immediately preceding phrase.

---

## Publishing to npm

If you want to publish your own version:

```bash
# 1. Build the distributable bundle
npm run build:lib
# Produces dist/honest-ai-loader.js (ESM), dist/honest-ai-loader.cjs (CJS),
# dist/honest-ai-loader.d.ts (TypeScript declarations), dist/style.css

# 2. Create an account on https://www.npmjs.com if you don't have one

# 3. Log in from the terminal
npm login
# Prompts for username, password, and OTP if 2FA is enabled

# 4. (Optional) Change the package name in package.json if "honest-ai-loader" is taken,
#    or scope it: "@yourusername/honest-ai-loader"

# 5. Publish
npm publish --access public
# --access public is required for scoped packages (@yourusername/...)
# Unscoped packages are public by default
```

After publishing, users install it with:

```bash
npm install honest-ai-loader
```

### Releasing a new version

npm uses [semantic versioning](https://semver.org). Bump the version before each publish:

```bash
npm version patch   # 0.1.0 → 0.1.1  (bug fixes)
npm version minor   # 0.1.0 → 0.2.0  (new features, backwards-compatible)
npm version major   # 0.1.0 → 1.0.0  (breaking changes)
npm publish --access public
```

`npm version` automatically updates `package.json` and creates a git tag.

---

## Demo

The interactive demo (`src/HonestAILoaderDemo.tsx`) runs at `http://localhost:5173` after `npm run dev`.

- **Left panel**: toggle and weight each built-in dictionary; build and export custom dictionaries as TypeScript.
- **Right panel**: live preview with controls for all graphic, text, and style props.

---

## Tech stack

- React 18
- TypeScript 5 (strict)
- Vite 5
- CSS Modules
- No runtime dependencies beyond React

---

## License

Do whatever you want with it. It's a POC.
