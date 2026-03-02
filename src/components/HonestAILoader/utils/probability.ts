import { Dictionary } from '../HonestAILoader.types';

/**
 * Selects a random index according to a normalized probability distribution.
 * Returns the last valid index as a floating-point edge-case fallback.
 */
export function weightedRandom(probabilities: number[]): number {
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];
    if (rand < cumulative) return i;
  }
  return probabilities.length - 1;
}

/**
 * Picks a random phrase from the provided dictionaries using weighted sampling.
 *
 * Algorithm:
 * 1. Filter to only dictionaries that match `language` and have at least one phrase.
 * 2. Re-normalize weights among the valid dictionaries.
 * 3. Pick a dictionary (weighted), then a random category, then a random phrase.
 * 4. Best-effort repetition avoidance: up to 5 attempts to avoid `lastPhrase`.
 *
 * Returns an empty string if no valid dictionaries or phrases are found.
 */
export function pickPhrase(
  dictionaries: Dictionary[],
  weights: number[],
  language: string,
  lastPhrase: string,
): string {
  const validEntries = dictionaries
    .map((dict, i) => ({ dict, weight: Math.max(0, weights[i] ?? 1) }))
    .filter(({ dict }) => dict.language === language && dict.categories.length > 0);

  if (validEntries.length === 0) return '';

  const totalWeight = validEntries.reduce((sum, { weight }) => sum + weight, 0);
  const normalizedWeights = validEntries.map(({ weight }) =>
    totalWeight > 0 ? weight / totalWeight : 1 / validEntries.length,
  );

  for (let attempt = 0; attempt < 5; attempt++) {
    const dictIdx = weightedRandom(normalizedWeights);
    const { dict } = validEntries[dictIdx];

    const validCategories = dict.categories.filter(c => c.values.length > 0);
    if (validCategories.length === 0) continue;

    const category = validCategories[Math.floor(Math.random() * validCategories.length)];
    const phrase = category.values[Math.floor(Math.random() * category.values.length)];

    if (phrase !== lastPhrase || attempt === 4) return phrase;
  }

  return '';
}
