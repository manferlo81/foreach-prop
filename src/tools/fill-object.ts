import type { InputEntry } from '../types/entry-types';
import type { Key } from '../types/private-types';
import { fromEntries } from './object-entries';

export function fillObject<K extends Key, V>(keys: K[], value: V): Record<K, V> {
  const entries = keys.map<InputEntry<V, K>>((key) => [key, value]);
  return fromEntries(entries);
}
