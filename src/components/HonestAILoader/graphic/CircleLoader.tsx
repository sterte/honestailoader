import React from 'react';
import styles from './CircleLoader.module.css';

interface CircleLoaderProps {
  loop: boolean;
  /** Progress 0..1 (pre-clamped by parent) */
  advancement: number;
}

const RADIUS = 40;
const STROKE_WIDTH = 6;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** SVG circular loader. In loop mode the whole SVG spins; in determinate mode the arc grows. */
const CircleLoader: React.FC<CircleLoaderProps> = ({ loop, advancement }) => {
  // Spinner shows a fixed 75% arc; progress shows actual completion
  const fillRatio = loop ? 0.75 : advancement;
  const dashOffset = CIRCUMFERENCE * (1 - fillRatio);

  return (
    <svg
      className={loop ? styles.spinnerSvg : styles.progressSvg}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {/* Background track */}
      <circle
        className={styles.track}
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE_WIDTH}
      />
      {/* Active arc — starts from 12 o'clock via rotate(-90) */}
      <circle
        className={loop ? styles.arc : styles.progressArc}
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
};

export default CircleLoader;
