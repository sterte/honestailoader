import type { BuiltInDictionaryKey, Dictionary } from '../HonestAILoader.types';
import dict1 from './dict1';
import dict2 from './dict2';
import dict3 from './dict3';

export { dict1, dict2, dict3 };

/** Maps each built-in key to its Dictionary array (one Dictionary per language) */
export const builtInDictionaryMap: Record<BuiltInDictionaryKey, Dictionary[]> = {
  dict1,
  dict2,
  dict3,
};
