import React from 'react';
import styles from './LinearLoader.module.css';

interface LinearLoaderProps {
  loop: boolean;
  /** Progress 0..1 (pre-clamped by parent) */
  advancement: number;
}

/** Pill-shaped linear loader. In loop mode a shimmer bounces; in determinate mode a bar grows. */
const LinearLoader: React.FC<LinearLoaderProps> = ({ loop, advancement }) => (
  <div className={styles.track} aria-hidden="true">
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

export default LinearLoader;
