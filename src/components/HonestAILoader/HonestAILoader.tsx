import React from 'react';
import { Dictionary, HonestAILoaderProps, StyleOptions, TextPosition } from './HonestAILoader.types';
import { builtInDictionaryMap } from './dictionaries';
import { normalizeProbabilities } from './utils/normalizeProbabilities';
import GraphicLoader from './graphic/GraphicLoader';
import TextLoader from './text/TextLoader';
import { useTextCycle } from './text/useTextCycle';
import styles from './HonestAILoader.module.css';

/**
 * HonestAILoader — a configurable loading component combining
 * an animated graphic with cycling, localized loading phrases.
 */
const HonestAILoader: React.FC<HonestAILoaderProps> = ({
  showGraphic = true,
  type = 'circle',
  loop = true,
  advancement = 0,
  showText = true,
  language = 'en',
  dictionaries = ['dict1'],
  customDictionaries,
  dictionaryProbabilities = [],
  customDictionaryProbabilities = [],
  textTime = 3000,
  textTransition = 'fade',
  transitionTime = 300,
  textPosition = 'bottom',
  styleOptions,
}) => {
  // ── 1. Resolve built-in dictionary keys to language-specific Dictionary objects ──
  const builtInSlots = (dictionaries ?? []).map((key, i) => {
    const variants = builtInDictionaryMap[key] ?? [];
    const dict = variants.find(d => d.language === language) ?? null;
    return { dict, rawWeight: dictionaryProbabilities[i] ?? 1 };
  });

  // ── 2. Normalize custom dictionaries to an array ──
  const customDictsArray: Dictionary[] = customDictionaries
    ? Array.isArray(customDictionaries)
      ? customDictionaries
      : [customDictionaries]
    : [];

  const customSlots = customDictsArray.map((dict, i) => ({
    dict: dict.language === language ? dict : null,
    rawWeight: customDictionaryProbabilities[i] ?? 1,
  }));

  // ── 3. Build combined list, filtering out slots without the requested language ──
  const allSlots = [...builtInSlots, ...customSlots].filter(
    (s): s is { dict: Dictionary; rawWeight: number } => s.dict !== null,
  );

  const allDictionaries = allSlots.map(s => s.dict);
  const rawWeights = allSlots.map(s => s.rawWeight);

  // ── 4. Normalize weights once across all active dictionaries ──
  const finalWeights = normalizeProbabilities(rawWeights, allSlots.length);

  // ── 5. Text cycle hook ──
  const { currentText, phase } = useTextCycle({
    allDictionaries,
    weights: finalWeights,
    language,
    textTime,
    transitionTime,
  });

  // Silently clamp advancement to [0, 1]
  const clampedAdvancement = Math.min(1, Math.max(0, advancement));

  const isOverlay = textPosition === 'over' || textPosition === 'under';

  const wrapperClass = [
    styles.wrapper,
    styles[`pos_${textPosition}` as keyof typeof styles],
  ]
    .filter(Boolean)
    .join(' ');

  const graphic = showGraphic && (
    <GraphicLoader type={type} loop={loop} advancement={clampedAdvancement} styleOptions={styleOptions} />
  );

  const text = showText && (
    <TextLoader
      currentText={currentText}
      phase={phase}
      textTransition={textTransition}
      transitionTime={transitionTime}
      styleOptions={styleOptions}
    />
  );

  return (
    <div
      className={wrapperClass}
      role="progressbar"
      aria-valuemin={loop ? undefined : 0}
      aria-valuemax={loop ? undefined : 100}
      aria-valuenow={loop ? undefined : Math.round(clampedAdvancement * 100)}
      aria-label="Loading"
    >
      {isOverlay ? (
        <>
          {/* Graphic sits in normal flow and defines the wrapper size */}
          {graphic && <div className={styles.overlayGraphic}>{graphic}</div>}
          {/* Text is absolutely centered; z-index determines over/under */}
          {text && (
            <div className={[
              styles.overlayText,
              textPosition === 'over' ? styles.overlayText_over : styles.overlayText_under,
            ].join(' ')}>
              {text}
            </div>
          )}
        </>
      ) : (
        <>
          {graphic}
          {text}
        </>
      )}
    </div>
  );
};

export default HonestAILoader;
