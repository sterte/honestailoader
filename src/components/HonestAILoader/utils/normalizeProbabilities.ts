/**
 * Normalizes an array of raw weights so they sum to 1.
 *
 * - Produces exactly `count` output values.
 * - Missing weights (when `weights.length < count`) default to 1 (uniform).
 * - Extra weights (when `weights.length > count`) are ignored.
 * - Negative values are clamped to 0.
 * - If all weights are 0 a uniform distribution is returned.
 */
export function normalizeProbabilities(weights: number[], count: number): number[] {
  if (count === 0) return [];

  const adjusted = Array.from({ length: count }, (_, i) =>
    Math.max(0, i < weights.length ? weights[i] : 1),
  );

  const sum = adjusted.reduce((acc, w) => acc + w, 0);
  if (sum === 0) return adjusted.map(() => 1 / count);

  return adjusted.map(w => w / sum);
}
