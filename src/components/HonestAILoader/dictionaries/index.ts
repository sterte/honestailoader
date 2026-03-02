import type { BuiltInDictionaryKey, Dictionary } from '../HonestAILoader.types';
import environment from './environment';
import work       from './work';
import society    from './society';
import power      from './power';
import data       from './data';
import quotes     from './quotes';
import cinema     from './cinema';

export { environment, work, society, power, data, quotes, cinema };

/** Maps each built-in key to its Dictionary array (one Dictionary per language) */
export const builtInDictionaryMap: Record<BuiltInDictionaryKey, Dictionary[]> = {
  environment,
  work,
  society,
  power,
  data,
  quotes,
  cinema,
};
