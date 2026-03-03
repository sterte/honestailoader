import React from 'react';
import { StyleOptions, TextTransition } from '../HonestAILoader.types';
import { Phase } from './useTextCycle';
import styles from './TextLoader.module.css';

interface TextLoaderProps {
  currentText: string;
  phase: Phase;
  textTransition: TextTransition;
  transitionTime: number;
  styleOptions?: StyleOptions;
}

/**
 * Renders the current phrase with a CSS transition driven by `phase`.
 * Dynamic visual properties come from `styleOptions`; animation timing
 * from `--transition-time`.
 */
const TextLoader: React.FC<TextLoaderProps> = ({
  currentText,
  phase,
  textTransition,
  transitionTime,
  styleOptions,
}) => {
  const resolvedTransition = textTransition === 'scroll' ? 'scroll-up' : textTransition;
  const phaseClass = styles[`${resolvedTransition}_${phase}`] ?? '';

  // CSS vars go on the wrapper: --text-line-height drives the fixed height calc,
  // and fontSize sets the `em` reference so the calc scales with font size.
  // Visual styles go on the <p> as inline so they override the class declarations.
  const wrapperStyle: React.CSSProperties = {
    '--text-line-height': String(styleOptions?.lineHeight ?? 1.5),
    ...(styleOptions?.fontSize && { fontSize: styleOptions.fontSize }),
  } as React.CSSProperties;

  const textStyle: React.CSSProperties = {
    '--transition-time': `${transitionTime}ms`,
    ...(styleOptions?.textColor     && { color:         styleOptions.textColor }),
    ...(styleOptions?.fontSize      && { fontSize:      styleOptions.fontSize }),
    ...(styleOptions?.fontWeight    && { fontWeight:    styleOptions.fontWeight }),
    ...(styleOptions?.fontFamily    && { fontFamily:    styleOptions.fontFamily }),
    ...(styleOptions?.letterSpacing && { letterSpacing: styleOptions.letterSpacing }),
    ...(styleOptions?.lineHeight    && { lineHeight:    styleOptions.lineHeight }),
  } as React.CSSProperties;

  return (
    <div className={styles.textWrapper} style={wrapperStyle}>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={[styles.text, phaseClass].filter(Boolean).join(' ')}
        style={textStyle}
      >
        {currentText}
      </p>
    </div>
  );
};

export default TextLoader;
