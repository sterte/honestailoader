import React from 'react';
import { StyleOptions } from '../HonestAILoader.types';
import styles from './LinearLoader.module.css';

interface LinearLoaderProps {
  loop: boolean;
  /** Progress 0..1 (pre-clamped by parent) */
  advancement: number;
  styleOptions?: StyleOptions;
}

/** Pill-shaped linear loader. In loop mode a shimmer bounces; in determinate mode a bar grows. */
const LinearLoader: React.FC<LinearLoaderProps> = ({ loop, advancement, styleOptions }) => {
  const width     = styleOptions?.size      ?? 240;
  const height    = styleOptions?.barHeight ?? 8;
  const primary   = styleOptions?.primaryColor   ?? '#6366f1';
  const secondary = styleOptions?.secondaryColor ?? '#e5e7eb';

  return (
    <div
      className={styles.track}
      aria-hidden="true"
      style={{
        width:           `${width}px`,
        height:          `${height}px`,
        backgroundColor: secondary,
        // expose primary as CSS variable so shimmer gradient can reference it
        '--primary-color': primary,
      } as React.CSSProperties}
    >
      {loop ? (
        <div className={styles.shimmer} />
      ) : (
        <div
          className={styles.progress}
          style={{ width: `${advancement * 100}%` }}
        />
      )}
    </div>
  );
};

export default LinearLoader;
