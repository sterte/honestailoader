import React from 'react';
import { StyleOptions } from '../HonestAILoader.types';
import styles from './CircleLoader.module.css';

interface CircleLoaderProps {
  loop: boolean;
  /** Progress 0..1 (pre-clamped by parent) */
  advancement: number;
  speed: number;
  styleOptions?: StyleOptions;
}

/** SVG circular loader. In loop mode the whole SVG spins; in determinate mode the arc grows. */
const CircleLoader: React.FC<CircleLoaderProps> = ({ loop, advancement, speed, styleOptions }) => {
  const size        = styleOptions?.size        ?? 100;
  const strokeWidth = styleOptions?.strokeWidth ?? 6;
  const primary     = styleOptions?.primaryColor   ?? '#6366f1';
  const secondary   = styleOptions?.secondaryColor ?? '#e5e7eb';

  // Keep the arc stroke inside the SVG viewport
  const radius        = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const cx            = size / 2;
  const dashOffset    = circumference * (1 - (loop ? 0.75 : advancement));
  const rotateOrigin  = `${cx} ${cx}`;

  return (
    <svg
      className={loop ? styles.spinnerSvg : styles.progressSvg}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      // CSS animation rotates around the SVG centre — keep transform-origin in sync
      style={{ '--svg-cx': `${cx}px`, '--spin-duration': `${1.2 / Math.max(speed, 0.01)}s` } as React.CSSProperties}
    >
      {/* Background track */}
      <circle
        className={styles.track}
        cx={cx} cy={cx} r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={secondary}
      />
      {/* Active arc — starts from 12 o'clock */}
      <circle
        className={loop ? styles.arc : styles.progressArc}
        cx={cx} cy={cx} r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={primary}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${rotateOrigin})`}
      />
    </svg>
  );
};

export default CircleLoader;
