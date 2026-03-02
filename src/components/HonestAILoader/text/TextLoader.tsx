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
  const phaseClass = styles[`${textTransition}_${phase}`] ?? '';

  const dynamicStyle: React.CSSProperties = {
    '--transition-time': `${transitionTime}ms`,
    ...(styleOptions?.textColor     && { color:         styleOptions.textColor }),
    ...(styleOptions?.fontSize      && { fontSize:      styleOptions.fontSize }),
    ...(styleOptions?.fontWeight    && { fontWeight:    styleOptions.fontWeight }),
    ...(styleOptions?.fontFamily    && { fontFamily:    styleOptions.fontFamily }),
    ...(styleOptions?.letterSpacing && { letterSpacing: styleOptions.letterSpacing }),
    ...(styleOptions?.lineHeight    && { lineHeight:    styleOptions.lineHeight }),
  } as React.CSSProperties;

  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[styles.text, phaseClass].filter(Boolean).join(' ')}
      style={dynamicStyle}
    >
      {currentText}
    </p>
  );
};

export default TextLoader;
