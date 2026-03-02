import React from 'react';
import { TextTransition } from '../HonestAILoader.types';
import { Phase } from './useTextCycle';
import styles from './TextLoader.module.css';

interface TextLoaderProps {
  currentText: string;
  phase: Phase;
  textTransition: TextTransition;
  transitionTime: number;
}

/**
 * Renders the current phrase with a CSS transition driven by `phase`.
 * The `--transition-time` CSS custom property lets the transition
 * duration stay in sync with the JS-side timing.
 */
const TextLoader: React.FC<TextLoaderProps> = ({
  currentText,
  phase,
  textTransition,
  transitionTime,
}) => {
  // e.g. "fade_in", "scroll_visible", "fade_out"
  const phaseClass = styles[`${textTransition}_${phase}`] ?? '';

  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[styles.text, phaseClass].filter(Boolean).join(' ')}
      style={{ '--transition-time': `${transitionTime}ms` } as React.CSSProperties}
    >
      {currentText}
    </p>
  );
};

export default TextLoader;
