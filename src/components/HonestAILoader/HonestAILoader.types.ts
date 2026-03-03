export type LoaderType = 'circle' | 'linear';
export type TextTransition = 'fade' | 'scroll' | 'scroll-up' | 'scroll-down' | 'scroll-left' | 'scroll-right';
export type TextPosition = 'top' | 'bottom' | 'left' | 'right' | 'over' | 'under';

export interface DictionaryCategory {
  category: string;
  values: string[];
}

export interface Dictionary {
  /** BCP 47 language tag, e.g. "en", "it", "fr" */
  language: string;
  categories: DictionaryCategory[];
}

export type BuiltInDictionaryKey = 'environment' | 'work' | 'society' | 'power' | 'data' | 'quotes' | 'cinema';

/** Visual customisation for the loader and its text. All fields are optional. */
export interface StyleOptions {
  // ── Graphic colours ──────────────────────────────────────────────
  /** Animated arc / progress-bar fill colour. Default: #6366f1 */
  primaryColor?: string;
  /** Track / background colour. Default: #e5e7eb */
  secondaryColor?: string;

  // ── Graphic sizing ───────────────────────────────────────────────
  /** Circle diameter OR linear bar width, in px. Default: 100 / 240 */
  size?: number;
  /** Circle stroke width in px (circle only). Default: 6 */
  strokeWidth?: number;
  /** Bar height in px (linear only). Default: 8 */
  barHeight?: number;

  // ── Text ─────────────────────────────────────────────────────────
  /** Phrase colour. Default: #6b7280 */
  textColor?: string;
  /** CSS font-size value, e.g. "0.9rem" or "14px". Default: "0.9rem" */
  fontSize?: string;
  /** CSS font-weight, e.g. 400 or "bold". Default: 400 */
  fontWeight?: number | string;
  /** CSS font-family. Default: inherits */
  fontFamily?: string;
  /** CSS letter-spacing, e.g. "0.05em". Default: normal */
  letterSpacing?: string;
  /** CSS line-height. Default: 1.5 */
  lineHeight?: number | string;
}



export interface HonestAILoaderProps {
  // --- Graphic ---
  /** Show the animated graphic loader (default: true) */
  showGraphic?: boolean;
  /** Type of graphic loader: 'circle' | 'linear' (default: 'circle') */
  type?: LoaderType;
  /** Whether the loader animates continuously; false = determinate progress (default: true) */
  loop?: boolean;
  /** Progress value 0..1, used only when loop=false. Clamped silently (default: 0) */
  advancement?: number;
  /** Animation speed multiplier when loop=true. 1 = default, 2 = twice as fast, 0.5 = half speed (default: 1) */
  speed?: number;

  // --- Text ---
  /** Show rotating text phrases (default: true) */
  showText?: boolean;
  /** BCP 47 language code for phrase selection (default: 'en') */
  language?: string;
  /** Built-in dictionary keys to include in the phrase pool (default: ['dict1']) */
  dictionaries?: BuiltInDictionaryKey[];
  /** Additional custom dictionaries to add to the pool */
  customDictionaries?: Dictionary | Dictionary[];
  /** Unnormalized sampling weights for each entry in dictionaries[] */
  dictionaryProbabilities?: number[];
  /** Unnormalized sampling weights for each entry in customDictionaries[] */
  customDictionaryProbabilities?: number[];
  /** Milliseconds each phrase stays fully visible (default: 3000) */
  textTime?: number;
  /** Transition animation style (default: 'fade') */
  textTransition?: TextTransition;
  /** Milliseconds for the in/out transition animation (default: 300) */
  transitionTime?: number;
  /** Visual style overrides: colours, sizes, font properties. */
  styleOptions?: StyleOptions;
  /** Where the text is placed relative to the graphic (default: 'bottom').
   *  top/bottom/left/right → flex layout direction.
   *  over → text floats centered on top of the graphic.
   *  under → text sits centered behind the graphic (graphic overlaps it). */
  textPosition?: TextPosition;
}
