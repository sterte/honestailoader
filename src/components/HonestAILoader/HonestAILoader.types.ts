export type LoaderType = 'circle' | 'linear';
export type TextTransition = 'fade' | 'scroll';

export interface DictionaryCategory {
  category: string;
  values: string[];
}

export interface Dictionary {
  /** BCP 47 language tag, e.g. "en", "it", "fr" */
  language: string;
  categories: DictionaryCategory[];
}

export type BuiltInDictionaryKey = 'dict1' | 'dict2' | 'dict3';

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
}
