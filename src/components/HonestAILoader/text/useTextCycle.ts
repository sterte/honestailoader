import { useEffect, useRef, useState } from 'react';
import { Dictionary } from '../HonestAILoader.types';
import { pickPhrase } from '../utils/probability';

export type Phase = 'in' | 'visible' | 'out';

interface UseTextCycleOptions {
  allDictionaries: Dictionary[];
  weights: number[];
  language: string;
  textTime: number;
  transitionTime: number;
}

/**
 * Cycles through random phrases from the provided dictionaries.
 *
 * Each phrase goes through three phases:
 *   'in'      → transition animation entering (duration: transitionTime)
 *   'visible' → fully visible (duration: textTime)
 *   'out'     → transition animation leaving (duration: transitionTime)
 *
 * Returns `currentText` and `phase` so the consumer can drive CSS animations.
 * SSR-safe: `Math.random` is only called inside `useEffect` (never during render).
 */
export function useTextCycle({
  allDictionaries,
  weights,
  language,
  textTime,
  transitionTime,
}: UseTextCycleOptions): { currentText: string; phase: Phase } {
  const [currentText, setCurrentText] = useState('');
  const [phase, setPhase] = useState<Phase>('in');

  // Refs keep latest values accessible inside the timer callbacks
  // without restarting the cycle on every render.
  const dicsRef = useRef(allDictionaries);
  dicsRef.current = allDictionaries;

  const weightsRef = useRef(weights);
  weightsRef.current = weights;

  const textTimeRef = useRef(textTime);
  textTimeRef.current = textTime;

  const transitionTimeRef = useRef(transitionTime);
  transitionTimeRef.current = transitionTime;

  const lastPhraseRef = useRef('');

  // Restart the cycle whenever `language` changes; other values update via refs.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let active = true;

    const addTimer = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        if (active) fn();
      }, Math.max(0, delay));
      timers.push(id);
    };

    const cycle = () => {
      const phrase = pickPhrase(
        dicsRef.current,
        weightsRef.current,
        language,
        lastPhraseRef.current,
      );
      lastPhraseRef.current = phrase;
      setCurrentText(phrase);
      setPhase('in');

      addTimer(() => {
        setPhase('visible');
        addTimer(() => {
          setPhase('out');
          addTimer(cycle, transitionTimeRef.current);
        }, textTimeRef.current);
      }, transitionTimeRef.current);
    };

    cycle();

    return () => {
      active = false;
      timers.forEach(clearTimeout);
    };
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return { currentText, phase };
}
